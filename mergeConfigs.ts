import * as fs from 'fs'
import { works } from './src/configuration/works.config.js'

function writeConfig() {

  const generatedWorks = works()

  fs.writeFile('./public/configuration/works.json', JSON.stringify(generatedWorks), err => {
    if (err) console.log('Error merging configs', err)
    console.log('Merged JSON file has been saved to public/configuration/collections.json')
  })
}

writeConfig()