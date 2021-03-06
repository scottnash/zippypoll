const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, argv) => {

  const plugins =  [
    new MiniCssExtractPlugin({
      filename: "/css/[name].css",
      chunkFilename: "/css/manifest.zippypoll.css"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BROWSER: JSON.stringify(true)
      }
    })
  ];
  const module = {
      rules: [
          {
              test: /(\.js|\.jsx)$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                  presets: ['env', { "targets": {"browsers": ["last 2 versions"]}}],
                  presets: ['react', 'es2015', 'stage-1'],
                  plugins: ['transform-runtime']
              }
          },
          {
             test: /\.(css|sass|scss)$/,
             use: [
                 MiniCssExtractPlugin.loader,
                 {
                     loader: 'css-loader',
                     options: {
                         autoprefixer: true,
                         sourceMap: true
                     }
                 },
                 {
                     loader: 'sass-loader',
                     options: {
                         sourceMap: true
                     }
                 }
             ]
          }
      ]
  };

  const resolve = {
    alias: {
      Sass: path.resolve(__dirname, './src/sass/'),
      Components: path.resolve(__dirname, './src/js/components/')
    },
    extensions: ['*', '.scss', '.css', '.js', '.jsx', '.json']
  };

  if( argv.buildmode === "backend" ) {
    return {
      target: "node",
      entry: {
        app: ["./src/server/server.js"]
      },
      output: {
        filename: 'server.js',
        path: path.resolve(__dirname, "./src/dist/"),
      },
      externals: [nodeExternals()],
      resolve,
      module,
      plugins
    }
  }

  if(process.env.NODE_ENV === 'production') {
    plugins.push(new OptimizeCssAssetsPlugin({cssProcessorOptions: { zindex: false, discardComments: { removeAll: true } }}));
    plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')}));
    plugins.push(new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }));
  } else {
    plugins.push(new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}));
    plugins.push(new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }));
  }
  return {
    mode: argv.mode,
    entry: {
        'zippypoll': ['babel-polyfill', './src/js/index.js'],
    },
    resolve,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, "./src/dist/"),
        chunkFilename: '[name].bundle.js'
    },
    module,
    plugins
  }
};
