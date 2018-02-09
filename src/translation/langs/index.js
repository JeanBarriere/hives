/**
 * The file enables `@/translation/index.js` to import all i18n languages
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', true, /\.json$/)
const modules = {}

files.keys().forEach(key => {
  if (modules[key.replace(/(\.\/|\.json)/g, '').replace(/(\.\/|\/(.*))/g, '')] === undefined) {
    modules[key.replace(/(\.\/|\.json)/g, '').replace(/(\.\/|\/(.*))/g, '')] = {}
  }
  modules[key.replace(/(\.\/|\.json)/g, '').replace(/(\.\/|\/(.*))/g, '')][key.replace(/(\.\/|\.json)/g, '').split('/')[1]] = files(key)
})

export default modules
