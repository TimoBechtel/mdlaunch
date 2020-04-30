import path from 'path';
import { parseTitle, parseToHTML } from './markdownParser';
import { renderTemplate } from './templateRenderer';
import { serve } from './server';
import { readFile, writeFile, copyDir } from './fileSystemHelper';

export const cli = async (args) => {
  const inputFilePath = args[0];

  if (!inputFilePath) {
    console.log('No file given!');
    process.exit();
  }

  const templateFolder = path.resolve(__dirname, '../dist/');
  const templateFilePath = `${templateFolder}index.html`;
  const targetFolder = './dist';

  try {
    await copyDir(templateFolder, targetFolder);
  } catch (error) {
    console.log(error);
  }

  let markdown;
  try {
    markdown = await readFile(inputFilePath);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  const parsedHTMLSection = parseToHTML(markdown);
  const title =
    parseTitle(markdown) || path.basename(inputFilePath).replace(/\..+$/, '');

  let renderedHTML;
  try {
    renderedHTML = await renderTemplate(templateFilePath, {
      title,
      html: parsedHTMLSection,
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }

  try {
    await writeFile('./dist/index.html', renderedHTML);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  serve(5000, 'dist');
};
