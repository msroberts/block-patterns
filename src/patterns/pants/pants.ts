import { IModel, IModelMap, models } from 'makerjs'
import { IPantsBlock } from './block'

export interface IPants extends IModelMap {
  waistline: IModel,
  baseline: IModel,
  lowerOutline: IModel,
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
      HP,
      h0a,
      h0b,
      h1a,
      h1b,
      k0a,
      k0b,
      k1a,
      k1b,
    } = block.points

    this.models = {
      baseline: new models.ConnectTheDots(false, [
        F,
        X,
        Y,
        B,
      ]),
      lowerOutline: new models.ConnectTheDots(false,[
        k0a,
        h0a,
        h0b,
        k0b,
        HP,
        k1a,
        h1a,
        h1b,
        k1b,
      ]),
      waistline: new models.ConnectTheDots(false, [
        O,
        S,
        Z,
      ]),
    }
  }
}
