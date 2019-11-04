const fs = require('fs')

const featuresFolder = './src/features'

const createFolder = featureName => {
  const destFolder = `${featuresFolder}/${featureName}`

  try {
    if (!fs.existsSync(destFolder)) {
      fs.mkdirSync(destFolder)
    }
  } catch (err) {
    console.error(err)
  }
}

const wrteToFile = (name, content = '') => {
  fs.appendFile(name, content, err => {
    if (err) throw err
    console.log(`${name} Saved!`)
  })
}

const createFs = featureName => {
  const destFolder = `${featuresFolder}/${featureName}`
  const destFileMask = `${destFolder}/${featureName}`

  const indexJsFile = `${destFolder}/index.js`
  const indexJsContent = `import './${featureName}.scss'
// import ./${featureName}.js'
`

  wrteToFile(indexJsFile, indexJsContent)

  const stylesFile = `${destFileMask}.scss`
  const stylesContent = `.${featureName} {
  display: flex;
}`

  wrteToFile(stylesFile, stylesContent)

  const templateFile = `${destFileMask}.pug`
  const templateContent = `- const ${featureName}Css = getCss('${featureName}');

// div(class=${featureName}Css.${featureName})
`

  wrteToFile(templateFile, templateContent)

  const jsFile = `${destFileMask}.js`

  wrteToFile(jsFile, '')
}

const linkFeature = featureName => {
  const rootIndexJs = `./src/index.js`
  const contentJs = `import './features/${featureName}'
`

  wrteToFile(rootIndexJs, contentJs)

  const rootIndexTemplate = `./src/index.pug`
  const contentTemplate = `  include features/${featureName}/${featureName}
`

  wrteToFile(rootIndexTemplate, contentTemplate)
}

const args = process.argv
const featureNames = args.splice(2, args.length)

featureNames.forEach(feature => {
  createFolder(feature)
  createFs(feature)
  linkFeature(feature)
})
