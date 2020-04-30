import path from 'path';
import { parseTitle, parseToHTML } from './markdownParser';
import { renderTemplate } from './templateRenderer';
import { serve as runServer } from './server';
import { readFile, writeFile, copyDir } from './fileSystemHelper';
import yargs from 'yargs';

const processCLIArguments = () => {
  yargs
    .strict()
    .usage('$0 <file> [port]', 'alias to server "serve"', (yargs) => {
      yargs.positional('port', {
        alias: 'p',
        type: 'number',
        default: 5000,
        description: 'port to bind server to',
      });
    })
    .command(
      'serve <file> [port]',
      'build presentation from markdown and start a server',
      (yargs) => {
        yargs.positional('port', {
          alias: 'p',
          type: 'number',
          default: 5000,
          description: 'port to bind server to',
        });
      }
    )
    .command('build <file>', 'build a presentation')
    .option('output', {
      alias: 'o',
      type: 'string',
      default: 'dist',
      description: 'output directory',
    });

  return {
    inputFile: yargs.argv.file,
    outputPath: yargs.argv.output,
    port: yargs.argv.port,
    serve: yargs.argv._[0] !== 'build',
  };
};

export const cli = async () => {
  const { inputFile, outputPath, port, serve } = processCLIArguments();

  build(inputFile, outputPath);

  if (serve) runServer(port, outputPath);
};

async function build(inputFile, outputPath) {
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

  const parsedHTMLSection = parseToHTML(markdown);
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
