import { IModel, IModelMap } from 'makerjs'
import { BodiceFront } from '../bodice-block/front'
import { IBodiceBlockShaped } from './block'

export interface IBodiceFrontShaped extends IModelMap {
  centerFront: IModel,
  neckline: IModel,
  shoulder: IModel,
  armhole: IModel,
  underarm: IModel,
  shoulderDart: IModel,
}

export class BodiceFrontShaped implements IModel {
  public models: IBodiceFrontShaped

  constructor (block: IBodiceBlockShaped) {
    const front = new BodiceFront(block.bodiceBlock)

    this.models = {
      ...front.models,
    }
  }
}
