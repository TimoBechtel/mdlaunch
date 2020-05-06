import yargs from 'yargs';

export const processCLIArguments = () => {
  yargs
    .scriptName('mdlaunch')
    .strict()
    .example(
      '$0 README.md --port 3000 --output "my-presentation" --header-level 4',
      'Build a presentation to my-presentation and start a server on port 3000. Also use any header with level 4 or lower to separate slides. (e.g. ### Header)'
    )
    .usage(
      '$0 <file>',
      'build a presentation from a markdown file and  start a server (alias to "mdlaunch serve <file> --open")',
      (yargs) => {
        yargs.option('port', {
          alias: 'p',
          type: 'number',
          default: 5000,
          description: 'port to bind server to',
        });
        yargs.option('open', {
          type: 'boolean',
          default: true,
          description: 'open browser after creating presentation',
        });
      }
    )
    .command(
      'serve <file>',
      'build presentation from markdown and start a server',
      (yargs) => {
        yargs.option('port', {
          alias: 'p',
          type: 'number',
          default: 5000,
          description: 'port to bind server to',
        });
        yargs.option('open', {
          type: 'boolean',
          description: 'open browser after creating presentation',
        });
      }
    )
    .command('build <file>', 'build a presentation')
    .option('output', {
      alias: 'o',
      type: 'string',
      default: 'dist',
      description: 'output directory',
    })
    .option('separator', {
      alias: 's',
      type: 'string',
      conflicts: 'header-level',
      description: 'regular expression for separating slides',
    })
    .option('header-level', {
      alias: 'l',
      type: 'number',
      conflicts: 'separator',
      description: 'maximum header level for separating slides',
    });

  return {
    inputFile: yargs.argv.file,
    outputPath: yargs.argv.output,
    port: yargs.argv.port,
    serve: yargs.argv._[0] !== 'build',
    open: yargs.argv.open,
    parserOptions: {
      sectionSeparator: yargs.argv.separator,
      maxHeaderLevel: yargs.argv['header-level'],
    },
  };
};
