module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
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
    ]
  })
}
