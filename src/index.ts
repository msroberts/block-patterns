import { writeFile } from 'fs'
import { exporter, IModel, model, unitType } from 'makerjs'
import { BodiceBack } from './patterns/bodice-block/back'
import { bodiceBlock, IBodiceMeasurements } from './patterns/bodice-block/block'
import { BodiceFront } from './patterns/bodice-block/front'
import { BodiceBackShaped } from './patterns/bodice-shaped/back'
import { bodiceBlockShaped } from './patterns/bodice-shaped/block'
import { BodiceFrontShaped } from './patterns/bodice-shaped/front'
import { ISleeveMeasurements, sleeveBlock } from './patterns/sleeve/block'
import { Sleeve } from './patterns/sleeve/sleeve'

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

const block = bodiceBlock(measurements)
const sleeve = sleeveBlock(measurements)

const svg: IModel = {
  models: {
    back: model.layer(new BodiceBack(block), 'green'),
    front: model.layer(new BodiceFront(block), 'red'),
    sleeve: model.move(
      model.layer(new Sleeve(sleeve), 'orange'),
      [block.x.centerFront + 2, 0],
    ),
  },
  units: unitType.Centimeter,
}

const blockShaped = bodiceBlockShaped(block, measurements)

svg.models!.backShaped = model.layer(new BodiceBackShaped(blockShaped), 'blue')
svg.models!.frontShaped = model.layer(new BodiceFrontShaped(blockShaped), 'fuchsia')

writeFile('output.svg', exporter.toSVG(svg), console.log)
