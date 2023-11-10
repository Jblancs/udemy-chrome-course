const path = require('path') //built in module for handling directories
const CopyPlugin = require('copy-webpack-plugin') //copies files into dist folder
const HtmlPlugin = require('html-webpack-plugin') //copies html to dist

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/i,
      },
      {
        type: 'asset/resource',
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(['popup', 'options']),
  ],
  resolve: {
    extensions: ['.tsx', 'ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
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

// adding options page
// create another html plugin and chunk (follow pattern for popup)
// since html plugin follow same pattern we can use a helper function getHTMLPlugins to create it (pass in array of chunk names)
// destructure since we return an array of plugins

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: 'React Extension',
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  )
}

// add optimization splitChunks which allows chunks to share modules

// CSS loader ----------------------------------------------------------------------------------
// install CSS loaders and add new rule for them
// in dist folder you wont see css files since the loaders bundle css into the js files

// adding rule type: asset/resource lets us import certain types of files directly into typescript code
// this is important since some modules are packed with font files, svg, etc

// background and contentScript ----------------------------------------------------------------
// add new chunk since background and contentScript have their own js file
// since they are js files we do not need to add an html plugin

