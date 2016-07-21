var path = require('path')
var webpack = require('webpack')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity,
    files: [
      'webpack.test.js'
    ],
    preprocessors: {
      'webpack.test.js': ['webpack']
    },
    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter')
    ],
    webpackServer: {
      progress: false,
      stats: false,
      debug: false
    },
    webpack: {
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
  })
}
