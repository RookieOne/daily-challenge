var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['node_modules', path.join(__dirname, '/src')]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory!eslint'
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  }
}
