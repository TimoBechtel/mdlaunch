import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import html from 'rollup-plugin-html2';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import normalize from 'postcss-normalize';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist/',
    sourcemap: dev,
  },
  plugins: [
    dev &&
      serve({
        port: 3000,
        contentBase: 'dist/',
      }),
    del({
      targets: 'dist/*',
      runOnce: dev,
    }),
    resolve(),
    commonjs(),
    !dev &&
      babel({
        exclude: ['node_modules/**'],
        presets: ['@babel/preset-env'],
      }),
    postcss({
      extract: true,
      plugins: [
        normalize({ forceImport: true }),
        ...(!dev ? [postcssPresetEnv, cssnano] : []),
      ],
    }),
    !dev && terser(),
    html({
      template: 'src/template.html',
      fileName: 'index.html',
      minify: dev
        ? false
        : {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
          },
    }),
  ],
};
