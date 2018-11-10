import { angle, IModel, IModelMap, IPoint, models } from 'makerjs'

import { smoothCurve } from '../../helpers/curve'
import { dots } from '../../helpers/dots'
import { IBodiceBlock } from './block'

export interface IBodiceBack extends IModelMap {
  centerBack: IModel,
  underarm: IModel,
  armhole: IModel,
  shoulder: IModel,
  neckline: IModel,
  shoulderDart: IModel,
  dots: IModel,
}

export class BodiceBack implements IModel {
  public models: IBodiceBack

  constructor (public block: IBodiceBlock) {
    const {
      centerBack,
      backWidth,
    } = block.x
    const {
      O,
      linexB,
      lineB,
      lineH,
    } = block.y
    const {
      HP,
      NP,
      SP,
      UP,
      WP,
    } = block.points
    const {
      underarmAngle,
    } = block.angles
    const {
      shoulderDartBack,
      shoulderDartFront,
    } = block.darts

    const armholePoint: IPoint = [centerBack + backWidth, linexB]

    this.models = {
      armhole: smoothCurve([
        {
          angleInDegrees: Math.min(
            angle.ofPointInDegrees(SP, shoulderDartBack.point1) + 90,
            angle.ofPointInDegrees(SP, armholePoint),
          ),
          distance: (SP[1] - linexB) / 3,
          origin: SP,
        },
        {
          angleInDegrees: 270,
          distance: (linexB - lineB) / 2,
          origin: armholePoint,
        },
        {
          angleInDegrees: underarmAngle + 90,
          distance: (UP[0] - armholePoint[0]) / 2,
          origin: UP,
        },
      ]),
      centerBack : new models.ConnectTheDots(false, [
        [centerBack, O],
        [centerBack, lineH],
        HP,
      ]),
      dots: dots([
        [backWidth / 2, linexB],
        [backWidth / 2, lineB],
        armholePoint,
      ]),
      neckline: smoothCurve([
        {
          angleInDegrees: angle.ofPointInDegrees(shoulderDartBack.point0, NP) -
            angle.ofPointInDegrees(block.points.NPf, shoulderDartFront.point0) - 90,
          distance: NP[1] - O,
          origin: NP,
        },
        {
          angleInDegrees: 180,
          distance: (NP[0] - centerBack) / 2,
          origin: [centerBack, O],
        },
      ]),
      shoulder: new models.ConnectTheDots(false, [
        NP,
        shoulderDartBack.point0,
        shoulderDartBack.bisector,
        shoulderDartBack.point1,
        SP,
      ]),
      shoulderDart: new models.ConnectTheDots(false, [
        shoulderDartBack.point0,
        shoulderDartBack.base,
        shoulderDartBack.point1,
      ]),
      underarm: smoothCurve([
        {
          angleInDegrees: underarmAngle,
          distance: (lineB - WP[1]) / 2,
          origin: UP,
        },
        {
          angleInDegrees: 270,
          distance: (lineB - WP[1]) / 3,
          origin: WP,
        },
        {
          angleInDegrees: 270,
          distance: (WP[1] - lineH) / 3,
          origin: HP,
        },
      ]),
    }
  }
}
