const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV === 'development'
  ? require('./config/dev.env')
  : require('./config/prod.env')

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
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': env
      })
    ]
  },
  devServer: {
    allowedHosts: [
      '.localhost',
      '.minizor',
      '.hive'
    ]
  }
}
