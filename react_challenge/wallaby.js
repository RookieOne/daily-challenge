// var wallabyWebpack = require('wallaby-webpack')
// var webpackConfig = require('./build/config/make-webpack-config')()
// var babel = require('babel')

// module.exports = function (wallaby) {
//   var webpackPostprocessor = wallabyWebpack(webpackConfig)

//   // removing babel-loader, we will use babel compiler instead, it's more performant
//   webpackConfig.module.loaders = webpackConfig.module.loaders.filter(function (l) {
//     return l.loader !== 'babel-loader'
//   })

//   // removing devtool (if you don't have more loaders that transform your code)
//   delete webpackConfig.devtool

//   // if you prefer to use babel loader over babel compiler,
//   // don't remove it from loaders, assign the webpackConfig.devtool value to:
//   // 'source-map or 'hidden-source-map' or 'cheap-module-source-map'
//   // and remove the compilers section below.

//   var wallabyPostprocessor = wallabyWebpack(webpackConfig)

//   return {
//     files: [
//       { pattern: 'build/config/phantomjs-shim.js', instrument: false },
//       { pattern: 'src/**/*.js', load: false }
//     ],
//     testFramework: 'mocha',
//     debug: true,
//     tests: [
//       { pattern: 'test/**/*-test.js', load: false }
//     ],

//     compilers: {
//       'src/**/*.js*': wallaby.compilers.babel({ babel: babel /* , stage: 0 */ })
//     },
//     postprocessor: webpackPostprocessor,

//     bootstrap: function () {
//       window.__moduleBundler.loadTests()
//     }
//   }
// }

var wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./webpack.karma.config.js')
var wallabyPostprocessor = wallabyWebpack(webpackConfig)

module.exports = function (wallaby) {
  return {
    files: [
      { pattern: 'src/**/*.js', load: false }
    ],
    tests: [
      { pattern: 'test/**/*-test.js', load: false }
    ],
    testFramework: 'mocha',
    debug: true,
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['es2015', 'stage-0', 'react']
      }),
      '**/*.jsx': wallaby.compilers.babel({
        presets: ['es2015', 'stage-0', 'react']
      })
    },
    postprocessor: wallabyPostprocessor,
    setup: function () {
      // we need this for webpack. DO NOT REMOVE
      window.__moduleBundler.loadTests()
    }
  }
}
