const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-source-map'
})

// pass in common and additional config options we want to overwrite in common
