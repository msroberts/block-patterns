import { IModel, IModelMap, models } from 'makerjs'
import { IPantsBlock } from './block'

export interface IPants extends IModelMap {
  waistline: IModel,
  baseline: IModel,
}

export class Pants implements IModel {
  public models: IPants

  constructor (block: IPantsBlock) {
    const {
      F,
      X,
      Y,
      B,
      O,
      S,
      Z,
    } = block.points

    this.models = {
      baseline: new models.ConnectTheDots(false, [
        F,
        X,
        Y,
        B,
      ]),
      waistline: new models.ConnectTheDots(false, [
        O,
        S,
        Z,
      ]),
    }
  }
}
