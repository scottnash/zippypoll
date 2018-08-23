// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: './src/server/server.js',
  output: {
    file: './src/dist/server.js',
    format: 'cjs'
  },
  external: [
    'react',
    'react-dom/server',
    'express',
    'react-router-dom'
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', { modules: false }], "react"]
    })
  ]
};
