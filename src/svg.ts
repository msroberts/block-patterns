import { exporter, IModel } from 'makerjs'
import { writeAsync } from './fs-async'

export async function writeSvg (filename: string, model: IModel) {
  const svg = exporter.toSVG(model, {
    svgAttrs: {
      xmlns: 'http://www.w3.org/2000/svg',
    },
  })

  await writeAsync(filename, svg)
}
