import * as fs from 'fs'
import collections from './src/configuration/collections.config.js'

function writeConfig() {
  fs.writeFile('./public/configuration/collections.json', JSON.stringify(collections), err => {
    if (err) console.log('Error merging configs', err)
    console.log('Merged JSON file has been saved to public/configuration/collections.json')
  })
}

writeConfig()