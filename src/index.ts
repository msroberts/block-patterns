import { BlockPatterns } from './patterns'
import { IBodiceMeasurements } from './patterns/bodice-block/block'
import { ISleeveMeasurements } from './patterns/sleeve/block'
import { writeSvg } from './svg'

const measurements: IBodiceMeasurements & ISleeveMeasurements = {
  B: 92,
  H: 98,
  W: 70,
  // tslint:disable-next-line:object-literal-sort-keys
  LW: 40,
  xB: 36,
  Ch: 38,
  S: 12.5,
  TA: 30,
  LA: 60,
  LE: 32,
  Ew: 31,
  Wr: 16.5,
}

const patterns = new BlockPatterns(measurements)
const filename = 'output.svg'

writeSvg(filename, patterns)
  .catch(console.error)
