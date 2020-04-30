import yargs from 'yargs';

export const processCLIArguments = () => {
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
