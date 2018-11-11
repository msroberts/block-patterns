import { join } from 'path'
import { readAsync } from './fs-async'
import { BlockPatterns } from './patterns'
import { IBodiceMeasurements } from './patterns/bodice-block/block'
import { ISleeveMeasurements } from './patterns/sleeve/block'
import { writeSvg } from './svg'

export async function generatePattern (input: string, output: string) {
  const measurements: IBodiceMeasurements & ISleeveMeasurements = JSON.parse(
    await readAsync(join(process.cwd(), input)),
  )

  const patterns = new BlockPatterns(measurements)
  const filename = join(process.cwd(), output)

  await writeSvg(filename, patterns)
}
