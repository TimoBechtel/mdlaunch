import { terser } from 'rollup-plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/cli/main.js',
  output: {
    file: 'dist/cli/main.js',
    format: 'cjs',
  },
  external: ['path', 'marked', 'ejs', 'fs', 'ncp', 'polka', 'sirv', 'yargs'],
  plugins: [!dev && terser()],
};
