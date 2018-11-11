import { IModel, IModelMap, models } from 'makerjs'
import { dots } from '../../helpers/dots'
import { ISleeveBlock } from './block'

export interface ISleeve extends IModelMap {
  dots: IModel,
  lineE: IModel,
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
      E,
    } = block.points

    this.models = {
      dots: dots([
        U,
        B,
        T,
        F,
        Uf,
        E,
      ]),
      lineE: new models.ConnectTheDots(false, [
        T,
        E,
      ]),
    }
  }
}
