import { writeFile } from 'fs'
import { exporter, model } from 'makerjs'
import { BodiceBack, bodiceBlock, BodiceFront, IBodiceMeasurements } from './patterns/bodice-block'

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
