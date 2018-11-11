import { generatePattern } from './generate'

const [input, output] = process.argv.slice(2)

generatePattern(input, output)
  .catch(console.error)
