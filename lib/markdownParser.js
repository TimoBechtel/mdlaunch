import marked from 'marked';

export const parseToHTML = (
  markdown,
  { sectionSeparator = '<h[1-2]' } = {}
) => {
  let rendered = marked(markdown);
  rendered = rendered.replace(
    new RegExp(`(${sectionSeparator})`, 'g'),
    '</section><section>$1'
  );
  rendered = `<section>${rendered}</section>`;
  rendered = rendered.replace(/<section><\/section>/, '');
  return rendered;
};

export const parseTitle = (markdown) => {
  const h1 = markdown.match(/#(.*)\n\r?/);
  return h1 && h1.length > 0 ? h1[1].trim() : null;
};
