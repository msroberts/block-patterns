import { angle, IModel, IModelMap, models, point } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { dots } from '../../helpers/dots'
import { IBodiceBlock } from './block'

export interface IBodiceFront extends IModelMap {
  centerFront: IModel,
  neckline: IModel,
  shoulder: IModel,
  armhole: IModel,
  underarm: IModel,
  shoulderDart: IModel,
  dots: IModel,
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
      WPf,
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
      armhole: smoothCurve([
        {
          angleInDegrees: Math.max(
            angle.ofPointInDegrees(point1, SPf) + 90,
            angle.ofPointInDegrees(SPf, ChP),
          ),
          distance: (SPf[1] - ChP[1]) / 2,
          origin: SPf,
        },
        {
          angleInDegrees: underarmAngle,
          distance: (ChP[1] - UPf[1]) * 2 / 3,
          origin: ChP,
        },
        {
          angleInDegrees: underarmAngle - 90,
          distance: (ChP[0] - UPf[0]) / 2,
          origin: UPf,
        },
      ]),
      centerFront: new models.ConnectTheDots(false, [
        [centerFront, neckline],
        [centerFront, HPf[1]],
        HPf,
      ]),
      dots: dots([
        point.add(base, [0,-1]),
        ChP,
      ]),
      neckline: smoothCurve([
        {
          angleInDegrees: 270,
          distance: (NPf[1] - neckline) / 3,
          origin: NPf,
        },
        {
          angleInDegrees: 0,
          distance: (centerFront - NPf[0]) * 2 / 3,
          origin: [centerFront, neckline],
        },
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
          angleInDegrees: underarmAngle,
          distance: (UPf[1] - WPf[1]) / 3,
          origin: UPf,
        },
        {
          angleInDegrees: 270,
          distance: (UPf[1] - WPf[1]) / 3,
          origin: WPf,
        },
        {
          angleInDegrees: 270,
          distance: (WPf[1] - HPf[1]) / 3,
          origin: HPf,
        },
      ]),
    }
  }
}
