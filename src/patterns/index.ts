import { IModel, IModelMap, model, unitType } from 'makerjs'
import { Scale } from '../helpers/scale'
import { BodiceBack } from './bodice-block/back'
import { bodiceBlock, IBodiceMeasurements } from './bodice-block/block'
import { BodiceFront } from './bodice-block/front'
import { BodiceBackShaped } from './bodice-shaped/back'
import { bodiceBlockShaped } from './bodice-shaped/block'
import { longDart } from './bodice-shaped/dart'
import { BodiceFrontShaped } from './bodice-shaped/front'
import { IPantsMeasurements, pantsBlock } from './pants/block'
import { Pants } from './pants/pants'
import { skirtBlock } from './skirt/block'
import { Skirt } from './skirt/skirt'
import { ISleeveMeasurements, sleeveBlock } from './sleeve/block'
import { Sleeve } from './sleeve/sleeve'

export interface IBlockPatterns extends IModelMap {
  back: IModel,
  front: IModel,
  sleeve: IModel,
  backShaped: IModel,
  frontShaped: IModel,
}

export class BlockPatterns implements IModel {
  public models: IBlockPatterns

  public units = unitType.Centimeter

  constructor (measurements: IBodiceMeasurements & ISleeveMeasurements & IPantsMeasurements) {
    const block = bodiceBlock(measurements)
    const sleeve = sleeveBlock(measurements)
    const skirt = skirtBlock(measurements)

    const back = model.layer(new BodiceBack(block), 'green')
    const front = model.layer(new BodiceFront(block), 'red')

    const blockShaped = bodiceBlockShaped(block, measurements)

    model.addModel(back, longDart(blockShaped.darts.backWaistDart, block.y.lineW), 'backWaistDart')
    model.addModel(front, longDart(blockShaped.darts.frontWaistDart, block.y.lineW), 'frontWaistDart')

    const backShaped = model.layer(new BodiceBackShaped(blockShaped), 'blue')
    const frontShaped = model.layer(new BodiceFrontShaped(blockShaped), 'fuchsia')

    this.models = {
      back,
      backShaped,
      front,
      frontShaped,
      pants: model.move(
        model.layer(new Pants(pantsBlock(measurements)), 'teal'),
        [-(measurements.H * 3 / 4), 0],
      ),
      scale: model.layer(new Scale([block.points.UP[0], -11]), 'black'),
      skirt: model.move(
        model.layer(new Skirt(skirt), 'aqua'),
        [-2, 0],
      ),
      sleeve: model.move(
        model.layer(new Sleeve(sleeve), 'orange'),
        [block.x.centerFront + 2, 0],
      ),
    }
  }
}
