import { IModel, IModelMap, IPoint, models, point } from 'makerjs'

export class Scale implements IModel {
  public models: IModelMap

  constructor (origin: IPoint) {
    this.models = {
      scale: new models.ConnectTheDots(true, [
        origin,
        point.add(origin, [0, 10]),
        point.add(origin, [1, 10]),
        point.add(origin, [1, 0]),
      ]),
    }
  }
}
