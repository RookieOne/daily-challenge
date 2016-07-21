var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['node_modules', path.join(__dirname, '/src'), path.join(__dirname, '/test')]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^\.\/package$/, function (result) {
      if (/cheerio/.test(result.context)) {
        result.request = './package.json'
      }
    })
  ]
}
