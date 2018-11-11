import { generatePattern } from './generate'

generatePattern('measurements.json', 'output.svg')
  .catch(console.error)
