const path = require('path')
const utils = require('./build/utils')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const resolve = dir => {
  return path.join(__dirname, dir)
}

const isPro = process.env.NODE_ENV === 'production'

let baseUrl = '/vue';

module.exports = {
  baseUrl: baseUrl,
  pages: utils.setPages({}),
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_lib', resolve('src/common'))
      .set('_com', resolve('src/components'))
      .set('_img', resolve('src/images'))
      .set('_ser', resolve('src/services'))
  },
  configureWebpack: config => {
    if (isPro) {
      // 生产环境修改配置
      return {
        plugins: [
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(js|css)$'
            ),
            threshold: 10240,
            minRatio: 0.8
          }),
          // 使用包分析工具
          new BundleAnalyzerPlugin()
        ]
      }
    }
  }
}