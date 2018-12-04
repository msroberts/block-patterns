import { join } from 'path'
import { readAsync } from './fs-async'
import { BlockPatterns } from './patterns'
import { IBodiceMeasurements } from './patterns/bodice-block/block'
import { IHoodMeasurements } from './patterns/hood/block'
import { IPantsMeasurements } from './patterns/pants/block'
import { ISleeveMeasurements } from './patterns/sleeve/block'
import { writeSvg } from './svg'

export async function generatePattern (input: string, output: string) {
  const measurements: IBodiceMeasurements & ISleeveMeasurements & IPantsMeasurements & IHoodMeasurements = JSON.parse(
    await readAsync(join(process.cwd(), input)),
  )

  const patterns = new BlockPatterns(measurements)
  const filename = join(process.cwd(), output)

  await writeSvg(filename, patterns)
}
