const fs = require('fs');

const TARGET_DIR = 'dist/themes/';
const SOURCE_DIR = 'node_modules/reveal.js/css/theme/';
const themes = require('./themes');

if (!fs.existsSync(TARGET_DIR)) fs.mkdirSync(TARGET_DIR, { recursive: true });

themes.forEach((fileName) => {
  fs.copyFile(`${SOURCE_DIR}${fileName}`, `${TARGET_DIR}${fileName}`, (err) => {
    if (err) console.log(err);
  });
});
