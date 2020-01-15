const fs = require('fs')

const fileWrite = (name, content = '') => {
  try {
    fs.appendFileSync(name, content, err => {
      if (err) throw err
    })

  } catch (err) {
    console.error(err)
  }
}

const folderCheckExists = path => {
  try {
    return fs.existsSync(path)

  } catch (err) {
    console.error(err)
  }
}

const folderCreate = path => {
  try {
    fs.mkdirSync(path)
    return path

  } catch (err) {
    console.error(err)
  }
}

module.exports = { fileWrite, folderCheckExists, folderCreate }
