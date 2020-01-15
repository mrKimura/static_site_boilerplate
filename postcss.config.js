module.exports = {
  modules: true,
  plugins: {
    autoprefixer: {
      grid: 'autoplace',
      supports: false,
    },
    'postcss-modules': {
      globalModulePaths: ['./src/core/styles', './tools/svg-inline', './src/blocks'],
      getJSON: function(cssFileName, json) {
        const fs = require('fs')
        const path = require('path')
        const isFeature = /features/.test(path.dirname(cssFileName))

        if (isFeature) {
          const cssName = path.basename(`${cssFileName}`)
          const jsonFileName = path.resolve(`${path.dirname(cssFileName)}/${cssName.split('.')[0]}-css.json`)

          fs.writeFileSync(jsonFileName, JSON.stringify(json))
        }
      },
    },
    'postcss-inline-svg': {},
  },
}
