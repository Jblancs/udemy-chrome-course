const path = require('path') //built in module for handling directories
const CopyPlugin = require('copy-webpack-plugin') //copies files into dist folder
const HtmlPlugin = require('html-webpack-plugin') //copies html to dist

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/manifest.json'),
          to: path.resolve('dist'),
        },
      ],
    }),
    new HtmlPlugin({
      title: 'React Extension',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', 'ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
}

// entry - tell webpack where to start looking to bundle everything
// module - define rules as webpack builds
// MUST to install ts-loader for module
// resolve - tells webpack what file types to apply modules to
// output - tells webpack where to place files once built

// in order to run build process, edit scripts and add "start" CLI command for webpack in package.json
// use command: npm start

// install plugins ---------------------------------------------------------

// copy-webpack-plugins
// generally anything that isnt handled by module is handled by plugin

// html-webpack-plugin
// name matches manifest.json file names
// chunks field takes array of chunks that we want to inject into html file
// edit "entry" to take in obj so it produces multiple chunks
// in output [name].js will resolve to chunk name that is currently being processed by webpack

// Error
// Uncaught EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "script-src 'self'".
// result of development mode of webpack
// add extra field devtool: 'cheap-module-source-map',
