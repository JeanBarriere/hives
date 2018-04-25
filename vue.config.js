const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '%': resolve('src/views'),
        '&': resolve('src/components')
      }
    }
  },
  devServer: {
    allowedHosts: [
      '.localhost'
    ]
  }
}
