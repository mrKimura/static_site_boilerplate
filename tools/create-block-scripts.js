const create = require('./utils/scripts')

const args = process.argv
const featureNames = args.splice(2, args.length)
const sectionName = 'blocks'

create(sectionName, featureNames)
