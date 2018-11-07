import { writeFile } from 'fs'
import { exporter, model } from 'makerjs'
import { BodiceBack } from './patterns/bodice-block/back'
import { bodiceBlock, IBodiceMeasurements } from './patterns/bodice-block/block'
import { BodiceFront } from './patterns/bodice-block/front'
import { BodiceBackShaped } from './patterns/bodice-shaped/back'
import { bodiceBlockShaped } from './patterns/bodice-shaped/block'

const measurements: IBodiceMeasurements = {
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

const block = bodiceBlock(measurements)

const svg = exporter.toSVG({models: {
  back: model.layer(new BodiceBack(block), 'back'),
  front: model.layer(new BodiceFront(block), 'front'),
}})

writeFile('output.svg', svg, console.log)

const blockShaped = bodiceBlockShaped(block, measurements)

const svg2 = exporter.toSVG({models: {
  backShaped: model.layer(new BodiceBackShaped(blockShaped), 'back'),
}})

writeFile('output-shaped.svg', svg2, console.log)
