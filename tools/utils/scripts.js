const { fileWrite, folderCheckExists, folderCreate } = require('./file-ops')

const createFolder = (name, rootFolder) => {
  const featureFolder = `${rootFolder}/${name}`
  const scriptsFolder = `${rootFolder}/${name}/scripts`

  const featureIsExists = folderCheckExists(featureFolder)
  const scriptsIsExists = folderCheckExists(scriptsFolder)

  if (!featureIsExists) {
    console.log(name, 'is not exists')
    return false
  }

  if (scriptsIsExists) {
    console.log('scripts is already is not exists')
    return false
  }

  return folderCreate(scriptsFolder)
}

const createIndexFile = (name, rootFolder) => {
  const destFile = `${rootFolder}/${name}/scripts/index.js`

  fileWrite(destFile, '')
}

function createSectionScripts(sectionName, names) {
  if (names < 1) {
    return
  }

  const rootPath = `./src/${sectionName}`

  names.forEach(name => {
    const createFolderIsOk = createFolder(name, rootPath)

    if (createFolderIsOk) createIndexFile(name, rootPath)
  })
}

module.exports = createSectionScripts
