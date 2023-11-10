const path = require('path') //built in module for handling directories

module.exports = {
  mode: 'development',
  entry: './src/test.tsx',
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', 'ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

// entry - tell webpack where to start looking to bundle everything
// module - define rules as webpack builds
// MUST to install ts-loader for module
// resolve - tells webpack what file types to apply modules to
// output - tells webpack where to place files once built
// in order to run build process, edit scripts and add "start" CLI command for webpack in package.json
// use command: npm start
