import marked from 'marked';
import hljs from 'highlight.js';

export const parseToHTML = (
  markdown,
  { sectionSeparator = null, maxHeaderLevel = 3 } = {}
) => {
  if (sectionSeparator === null)
    marked.use({
      renderer: {
        heading(text, level, raw, slugger) {
          const escapedText = slugger.slug(text);

          if (level <= maxHeaderLevel)
            return `</section><section><h${level} id="${escapedText}">${text}</h${level}>
            `;
          return false;
        },
      },
    });

  marked.setOptions({
    highlight: function (code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
      return hljs.highlight(validLanguage, code).value;
    },
  });

  let rendered = marked(markdown);
  if (sectionSeparator)
    rendered = rendered.replace(
      new RegExp(`(${sectionSeparator})`, 'g'),
      '</section><section>$1'
    );
  rendered = `<section>${rendered}</section>`;
  rendered = rendered.replace(/<section><\/section>/, '');
  return rendered;
};

export const parseTitle = (markdown) => {
  const h1 = markdown.match(/# (.*)\n\r?/);
  return h1 && h1.length > 0 ? h1[1].trim() : null;
};
