const path = require('path')
const glob = require('glob')
const utils = require('./build/utils')

const resolve = dir => {
  return path.join(__dirname, dir)
}

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
  }
}