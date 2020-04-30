import path from 'path';
import { parseTitle, parseToHTML } from './markdownParser';
import { renderTemplate } from './templateRenderer';
import { serve as runServer } from './server';
import { readFile, writeFile, copyDir } from './fileSystemHelper';
import { processCLIArguments } from './argumentsParser';

export const cli = async () => {
  const {
    inputFile,
    outputPath,
    port,
    serve,
    sectionSeparator,
  } = processCLIArguments();

  build(inputFile, outputPath, { sectionSeparator });

  if (serve) runServer(port, outputPath);
};

async function build(inputFile, outputPath, parserOptions) {
  const templateFolder = path.resolve(__dirname, '../dist/');
  const templateFileName = 'index.html';
  const templateFilePath = path.resolve(templateFolder, templateFileName);

  try {
    await copyDir(templateFolder, outputPath);
  } catch (error) {
    console.log(error);
  }

  let markdown;
  try {
    markdown = await readFile(inputFile);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  const parsedHTMLSection = parseToHTML(markdown, parserOptions);
  const title =
    parseTitle(markdown) || path.basename(inputFile).replace(/\..+$/, '');

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
    await writeFile(path.resolve(outputPath, templateFileName), renderedHTML);
  } catch (error) {
    console.log(error);
    process.exit();
  }
}
