var wallabyWebpack = require('wallaby-webpack')
var webpackConfig = require('./webpack.karma.config.js')
var wallabyPostprocessor = wallabyWebpack(webpackConfig)
// {
//   entry: './entry.js',
//   output: {
//     path: __dirname,
//     filename: 'bundle.js'
//   },
//   resolve: {
//     alias: {
//       underscore: 'vendor/underscore.min.js'
//     },
//     extensions: ['', '.jsx', '.js', '.json', '.scss'],
//     modulesDirectories: ['node_modules', __dirname + '/src']
//   },
//   module: {
//     loaders: [
//             { test: /\.css$/, loader: 'style!css' },
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         loader: 'babel?cacheDirectory'
//       }, {
//         test: /\.json$/,
//         loader: 'json'
//       }
//     ]
//   }
// }
// )

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
