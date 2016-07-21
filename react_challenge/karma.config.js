var webpackConfig = require('./webpack.karma.config')

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
    webpack: webpackConfig
  })
}
