/**
 * Created by zx1984 2018/3/26
 * https://github.com/zx1984
 */
const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
  module: {
    rules:
      [
        {
          test: /\.ts?$/,
          loader: 'ts-loader'
        },
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'stylus-loader',
              options: {
                compress: true
              }
            }
          ]
        },
        {
          test: /\.(png|pneg|jpg|jpeg|svg)/,
          use: [
            'url-loader'
          ]
        }
      ]
  },
  // 使用 source-map
  devtool: 'source-map',
  // 对 webpack-dev-server 进行配置
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    // 设置localhost端口
    port: 9000,
    // 自动打开浏览器
    open: true,
  },
  plugins: [
  ],
  // 设置出口文件地址与文件名
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tetris.js',
    libraryTarget: 'umd'
  }
})
