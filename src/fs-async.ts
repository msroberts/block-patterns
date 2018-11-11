import { readFile, writeFile } from 'fs'

export function readAsync (filename: string) {
  return new Promise<string>((resolve, reject) => {
    readFile(filename, 'utf8', (err, data) => {
      if (err) return reject(err)

      resolve(data)
    })
  })
}

export function writeAsync (filename: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    writeFile(filename, data, (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}
