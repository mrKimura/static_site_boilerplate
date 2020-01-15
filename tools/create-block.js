const create = require('./utils/structure')

const args = process.argv
const featureNames = args.splice(2, args.length)

const sectionName = 'blocks'

const getData = name => ({
  rootIndexJsFile: `./src/blocks/index.js`,
  rootIndexPugFile: `./src/blocks/index.pug`,
  contentRootIndexJs: `//import './${name}'
`,
  contentRootPugFile: `include ${name}/${name}
`,

  js: `import './${name}.scss'
// import {  } from './scripts'

// window.addEventListener('DOMContentLoaded', () => {
//
// })
`,
  style: `@import '../../core/styles/core';

.${name} {
  display: flex;
}`,
  pug: `mixin ${name}()
  .${name}
    `
})

create(sectionName, getData, featureNames)
