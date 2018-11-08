import { IModel, IModelMap, models } from 'makerjs'
import { BodiceBack } from '../bodice-block/back'
import { IBodiceBlockShaped } from './block'

export interface IBodiceBackShaped extends IModelMap {
  centerBack: IModel,
  underarm: IModel,
  armhole: IModel,
  shoulder: IModel,
  neckline: IModel,
  shoulderDart: IModel,
}

export class BodiceBackShaped implements IModel {
  public models: IBodiceBackShaped

  constructor (block: IBodiceBlockShaped) {
    const {
      centerBack,
    } = block.bodiceBlock.x
    const {
      O,
      linexB,
    } = block.bodiceBlock.y
    const {
      WP,
    } = block.bodiceBlock.points

    const back = new BodiceBack(block.bodiceBlock)

    this.models = {
      ...back.models,
      centerBack: new models.ConnectTheDots(false, [
        [centerBack, O],
        [centerBack, linexB],
        block.points.centerBackInner,
        WP,
      ]),
    }
  }
}
