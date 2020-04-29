#!/usr/bin/env node
const ncp = require('ncp').ncp;
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const ejs = require('ejs');
const sirv = require('sirv');
const polka = require('polka');

const args = process.argv.slice(2);
const file = args[0];

if (!file) {
  console.log('No file given!');
  process.exit();
}

ncp(path.resolve(__dirname, '../dist/'), './dist', (err) => {
  if (err) console.log(err);
  else {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) return console.log(err);

      // marked.setOptions({
      //   highlight: function (code, language) {
      //     const hljs = require('highlight.js');
      //     const validLanguage = hljs.getLanguage(language)
      //       ? language
      //       : 'plaintext';
      //     return hljs.highlight(validLanguage, code).value;
      //   },
      // });

      let rendered = marked(data);
      rendered = rendered.replace(/(<h[1-2])/g, '</section><section>$1');
      rendered = `<section>${rendered}</section>`;
      rendered = rendered.replace(/<section><\/section>/, '');

      const h1 = data.match(/#(.*)\n\r?/);
      let title =
        h1 && h1.length > 0
          ? h1[1].trim()
          : path.basename(file).replace(/\..+$/, '');

      ejs.renderFile(
        path.resolve(__dirname, '../dist/index.html'),
        {
          title,
          markdown: rendered,
        },
        (err, data) => {
          if (err) return console.log(err);
          fs.writeFile('./dist/index.html', data, (err) => {
            if (err) return console.log(err);
            serve(5000);
          });
        }
      );
    });
  }
});

function serve(port) {
  polka()
    .use(sirv('dist'))
    .listen(port, (err) => {
      if (err) throw err;
      console.log(`Started server on port: ${port}`);
    });
}
