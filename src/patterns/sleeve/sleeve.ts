import { IModel, IModelMap } from 'makerjs'
import { dots } from '../../helpers/dots'
import { ISleeveBlock } from './block'

export interface ISleeve extends IModelMap {
  dots: IModel
}

export class Sleeve implements IModel {
  public models: ISleeve

  constructor (block: ISleeveBlock) {
    const {
      U,
      B,
      T,
      F,
      Uf,
    } = block.points

    this.models = {
      dots: dots([
        U,
        B,
        T,
        F,
        Uf,
      ]),
    }
  }
}
