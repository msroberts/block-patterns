import { angle, IModel, IModelMap, models } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { IBodiceBlock } from './block'

export interface IBodiceFront extends IModelMap {
  centerFront: IModel,
  shoulder: IModel,
  underarm: IModel,
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
      ChP,
      UPf,
    } = block.points
    const {
      base,
      point0,
      point1,
      bisector,
    } = block.darts.shoulderDartFront
    const {
      underarmAngle,
    } = block.angles

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
      underarm: smoothCurve([
        {
          angleInDegrees: Math.max(
            angle.ofPointInDegrees(point1, SPf) + 90,
            angle.ofPointInDegrees(SPf, ChP),
          ),
          distance: (SPf[1] - ChP[1]) / 2,
          origin: SPf,
        },
        {
          angleInDegrees: 270,
          distance: (ChP[1] - UPf[1]) * 2 / 3,
          origin: ChP,
        },
        {
          angleInDegrees: underarmAngle - 90,
          distance: (ChP[0] - UPf[0]) / 2,
          origin: UPf,
        },
      ]),
    }
  }
}
