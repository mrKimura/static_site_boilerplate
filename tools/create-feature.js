const create = require('./utils/structure')

const args = process.argv
const featureNames = args.splice(2, args.length)

const sectionName = 'features'

const getData = name => ({
  rootIndexJsFile: `./src/index.js`,
  rootIndexPugFile: `./src/index.pug`,
  contentRootIndexJs: `import './features/${name}'
`,
  contentRootPugFile: `  include features/${name}/${name}
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
  pug: `- const ${name}Css = getCss('${name}');

// div(class=${name}Css.${name})
`,
})

create(sectionName, getData, featureNames)
