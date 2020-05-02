import path from 'path';
import { parseTitle, parseToHTML } from './markdownParser';
import { renderTemplate } from './templateRenderer';
import { serve as runServer } from './server';
import { readFile, writeFile, copyDir } from './fileSystemHelper';
import { processCLIArguments } from './argumentsParser';

const TEMPLATE_DIR = '../template/';
const TEMPLATE_FILE = 'index.html';

export const cli = async () => {
  const {
    inputFile,
    outputPath,
    port,
    serve,
    parserOptions,
  } = processCLIArguments();

  await build(inputFile, outputPath, parserOptions);

  if (serve) runServer(port, outputPath);
};

async function build(inputFile, outputPath, parserOptions) {
  const templateFolder = path.resolve(__dirname, TEMPLATE_DIR);
  const templateFilePath = path.resolve(templateFolder, TEMPLATE_FILE);

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
    await writeFile(path.resolve(outputPath, TEMPLATE_FILE), renderedHTML);
  } catch (error) {
    console.log(error);
    process.exit();
  }

  console.log(`Successfully build presentation to ${outputPath}`);
}
