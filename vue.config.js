const utils = require('./build/utils')
module.exports = {
  pages: {
    oldinvertnew: {
      // page 的入口
      entry: '/Users/syt_ios/workspace/h5/cli3-helloworld/src/views/oldinvertnew/main.js',
      // 模板来源
      template: '/Users/syt_ios/workspace/h5/cli3-helloworld/src/views/oldinvertnew/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'oldinvertnew',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'oldinvertnew']
    },
    soliuteme: {
      // page 的入口
      entry: '/Users/syt_ios/workspace/h5/cli3-helloworld/src/views/soliuteme/main.js',
      // 模板来源
      template: '/Users/syt_ios/workspace/h5/cli3-helloworld/src/views/soliuteme/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'soliuteme',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'soliuteme']
    },
    soliutemetru: {
      // page 的入口
      entry: '/Users/syt_ios/workspace/h5/cli3-helloworld/src/views/soliutemetru/main.js',
      // 模板来源
      template: '/Users/syt_ios/workspace/h5/cli3-helloworld/src/views/soliutemetru/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'soliutemetru',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'soliutemetru']
    }
  }
}