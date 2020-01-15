const { fileWrite, folderCheckExists, folderCreate } = require('./file-ops')

const createRootFolder = rootPath => {
  const featureIsExist = folderCheckExists(rootPath)

  if (featureIsExist) return

  return folderCreate(rootPath)
}

const createFolder = (name, rootPath) => {
  const destFolder = `${rootPath}/${name}`
  const featureIsExist = folderCheckExists(destFolder)

  if (featureIsExist) {
    console.log(destFolder, 'already exists')
    return
  }

  return folderCreate(destFolder)
}

const createFs = (name, folder, data) => {
  const { js, style, pug } = data

  const fileMask = `${folder}/${name}`

  const indexJsFile = `${folder}/index.js`
  const stylesFile = `${fileMask}.scss`
  const templateFile = `${fileMask}.pug`

  fileWrite(indexJsFile, js)
  fileWrite(stylesFile, style)
  fileWrite(templateFile, pug)
}

const linkFeature = data => {
  const { rootIndexJsFile, rootIndexPugFile, contentRootIndexJs, contentRootPugFile } = data

  fileWrite(rootIndexJsFile, contentRootIndexJs)
  fileWrite(rootIndexPugFile, contentRootPugFile)
}

function createAppSection(sectionName, getData, names) {
  if (names < 1) {
    return
  }

  const rootPath = `./src/${sectionName}`
  createRootFolder(rootPath)

  names.forEach(name => {
    const sectionFolder = createFolder(name, rootPath)
    const data = getData(name)

    if (sectionFolder) {
      createFs(name, sectionFolder, data)
      linkFeature(data)
    }
  })
}

module.exports = createAppSection
