import { writeFile } from 'fs'

export function writeAsync (filename: string, data: string) {
  return new Promise<void>((resolve, reject) => {
    writeFile(filename, data, (err) => {
      if (err) return reject(err)

      resolve()
    })
  })
}
