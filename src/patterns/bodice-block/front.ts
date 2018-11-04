import { IModel, IModelMap, models } from 'makerjs'
import { IBodiceBlock } from './block'

export interface IBodiceFront extends IModelMap {
  centerFront: IModel,
  shoulder: IModel,
  shoulderDart: IModel,
}

// tslint:disable-next-line:max-classes-per-file
export class BodiceFront implements IModel {
  public models: IBodiceFront

  constructor (public block: IBodiceBlock) {
    const {
      centerFront,
    } = block.x
    const {
      neckline,
    } = block.y
    const {
      HPf,
      NPf,
      SPf,
    } = block.points
    const {
      base,
      point0,
      point1,
      bisector,
    } = block.darts.shoulderDartFront

    this.models = {
      centerFront: new models.ConnectTheDots(false, [
        [centerFront, neckline],
        [centerFront, HPf[1]],
        HPf,
      ]),
      shoulder: new models.ConnectTheDots(false, [
        NPf,
        point0,
        bisector,
        point1,
        SPf,
      ]),
      shoulderDart: new models.ConnectTheDots(false, [
        point0,
        base,
        point1,
      ]),
    }
  }
}
