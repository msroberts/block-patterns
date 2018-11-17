import { IModel, IModelMap, models } from 'makerjs'
import { ISkirtBlock } from './block'

export class Skirt implements IModel {
  public models: IModelMap

  constructor (block: ISkirtBlock) {
    const {
      HP0,
      HP1,
      HP2,
      HP3,
      HP4,
    } = block.points

    this.models = {
      hipLine: new models.ConnectTheDots(false, [
        HP0,
        HP1,
        HP2,
        HP3,
        HP4,
      ]),
    }
  }
}
