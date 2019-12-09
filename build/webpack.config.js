const webpack = require('webpack')
const configSys = require('./config')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')
const pack = require('../package.json')
const today = new Date().toISOString().substr(0, 10)
const ip = 'localhost'
const { resolve } = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const from = resolve(
  __dirname,
  '../src/img'
)
const to1 = resolve(
  __dirname,
  '../dist'
)

const config = {
  mode: 'development',
  entry: {
    universe: resolve(__dirname, '../src/universe.js'),
    app: resolve(__dirname, '../src/index.js')
  },
  output: {
    path: resolve(__dirname, '../dist'), // 输出文件目录
    filename: '[name].bundle.js', // 输出文件名
    libraryTarget: 'var',
    publicPath: '/'
  },
  watch: true,
  externals: {
    three: 'Three'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader?cacheDirectory',
      options: {
        babelrc: true
      }
    }]
  },
  devtool: '#eval-source-map',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    disableHostCheck: true,
    hot: true,
    host: ip,
    open: true,
    port: configSys.port,
    proxy: {
      '*': {
        target: `http://${ip}:${configSys.devServerPort}`,
        secure: false,
        ws: false,
        bypass: function (req, res, opt) {
          if (
            /(\.json|\.jpg|\.css)$/.test(req.path) ||
            /\.bundle\.js/.test(req.path)
          ) {
            console.log('bypass', req.path)
            return req.path
          }
        }
      }
    }
  }
}

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production'
  delete config.watch
  delete config.devtool
  delete config.devServer
  config.optimization = {
    minimize: true
  }
  config.plugins = [
    new CopyWebpackPlugin([{
      from,
      to: to1,
      force: true
    }], {}),
    new UnminifiedWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `
/**
 * ${pack.name}
 * @version v${pack.version} - ${today}
 * @link ${pack.homepage}
 * @author ${pack.author.name} (${pack.author.email})
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
      `,
      raw: true
    })
  ]

  config.entry = {
    universe: './src/universe.js'
  }

  config.output = {
    path: resolve(__dirname, '../dist'), // 输出文件目录
    filename: '[name].min.js', // 输出文件名
    libraryTarget: 'umd',
    publicPath: '/',
    library: 'Universe'
  }

  config.externals = {
    three: {
      root: 'Three',
      commonjs: 'three',
      commonjs2: 'three',
      amd: 'three'
    }
  }

  config.devtool = 'source-map'
}

module.exports = config
