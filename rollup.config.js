// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';

export default {
  input: './src/server/server.js',
  output: {
    file: './src/dist/server.js',
    format: 'cjs'
  },
  external: [
    'express',
    'path',
    'react',
    'react-dom/server',
    'react-router-dom'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { modules: false }], 'react']
    }),
    resolve({ extensions: ['.scss', '.css', '.js', '.jsx', '.json' ] }),
    sass()
  ]
};
