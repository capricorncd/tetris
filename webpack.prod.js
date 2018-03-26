const path = require('path');
const merge = require('webpack-merge');
// 引入通用webpack配置文件
const base = require('./webpack.base.js');

module.exports = merge(base, {
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader'
          }
        ]
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
  devtool: 'cheap-module-source-map',
  plugins: [],
  output: {
    path: path.resolve('dist'),
    // 生成模式自动压缩代码，无需配置
    filename: 'tetris.min.js',
    libraryTarget: 'umd'
  }
})
