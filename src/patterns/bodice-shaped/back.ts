import { IModel, IModelMap } from 'makerjs'
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
    const back = new BodiceBack(block.bodiceBlock)

    this.models = {
      ...back.models,
    }
  }
}
