const path = require('path');

// glob 是 webpack 安装时依赖的一个第三方模块，还模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 安装并引用插件
var merge = require('webpack-merge');

// 取得相应的页面路径，因为之前的配置，所以是 src 文件夹下的 pages 文件夹
const PAGE_PATH = path.resolve(__dirname, '../src/views');

/* 
 * 多入口配置
 * 通过 glob 模块读取 pages 文件夹下的所有对应文件夹下的 js * 后缀文件，如果该文件存在
 * 那么就作为入口处理
 */
exports.getEntries = () => {
  let entryFiles = glob.sync(PAGE_PATH + '/*/*.js') // 同步读取所有入口文件
  let map = {}

  // 遍历所有入口文件
  entryFiles.forEach(filePath => {
    //console.info(filePath)
    let tmp = filePath.split('/').splice(-3, 2);
    // 以views/home输出,前台http://localhost:8080/views/home.html这样访问
    // 获取文件名
    let pathname = tmp.join("/")

    // 以键值对的形式存储
    map[pathname] = filePath
  })

  return map
}

// 多页面输出配置
// 与上面的多页面入口配置相同，读取 page 文件夹下的对应的 html 后缀文件，然后放入数组中
exports.htmlPlugin = configs => {
  let entryHtml = glob.sync(PAGE_PATH + '/*/index.html')
  let arr = []

  entryHtml.forEach(filePath => {
    let tmp = filePath.split('/').splice(-3, 2);
    // 以views/home输出,前台http://localhost:8080/views/home.html这样访问
    // 获取文件名
    let pathname = tmp.join("/")
    let conf = {
      template: filePath, // 模板路径
      filename: pathname + '.html', // 生成 html 的文件名
      chunks: ['manifest', 'vendor', pathname],
      inject: true,
    }

    // 如果有自定义配置可以进行 merge
    if (configs) {
      conf = merge(conf, configs)
    }

    // 针对生产环境配置
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true, // 删除 html 中的注释代码
          collapseWhitespace: true, // 删除 html 中的空白符
          // removeAttributeQuotes: true // 删除 html 元素中属性的引号
        },
        chunksSortMode: 'manual' // 按 manual 的顺序引入
      })
    }

    arr.push(new HtmlWebpackPlugin(conf))
  })

  return arr
}

// pages 多入口配置
exports.setPages = configs => {
  let entryFiles = glob.sync(PAGE_PATH + '/*');
  let map = {};

  entryFiles.forEach(filePath => {
    let filename = filePath.substring(filePath.lastIndexOf('/') + 1);

    let conf = {
      // page 的入口
      entry: filePath + '/main.js',
      // 模板来源
      template: filePath + '/index.html',
      // 在 dist/index.html 的输出
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      // chunks: ['manifest', 'vendor', filename]
      chunks: ['chunk-vendors', 'chunk-common', filename]
    };

    if (configs) {
      conf = merge(conf, configs)
    }

    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true, // 删除html中的注释代码
          collapseWhitespace: true, // 删除html中的空白符
        },
        chunksSortMode: 'manual' // 按manual的顺序引入
      })
    }
    map[filename] = conf;
  })

  return map
}