import { IModel, IModelMap, model, unitType } from 'makerjs'
import { BodiceBack } from './bodice-block/back'
import { bodiceBlock, IBodiceMeasurements } from './bodice-block/block'
import { BodiceFront } from './bodice-block/front'
import { BodiceBackShaped } from './bodice-shaped/back'
import { bodiceBlockShaped } from './bodice-shaped/block'
import { BodiceFrontShaped } from './bodice-shaped/front'
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

  constructor (measurements: IBodiceMeasurements & ISleeveMeasurements) {
    const block = bodiceBlock(measurements)
    const sleeve = sleeveBlock(measurements)

    const back = model.layer(new BodiceBack(block), 'green')
    const front = model.layer(new BodiceFront(block), 'red')

    const blockShaped = bodiceBlockShaped(block, measurements)

    const backShaped = model.layer(new BodiceBackShaped(blockShaped), 'blue')
    const frontShaped = model.layer(new BodiceFrontShaped(blockShaped), 'fuchsia')

    this.models = {
      back,
      backShaped,
      front,
      frontShaped,
      sleeve: model.move(
        model.layer(new Sleeve(sleeve), 'orange'),
        [block.x.centerFront + 2, 0],
      ),
    }
  }
}
