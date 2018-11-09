import { IModel, IModelMap, models } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { BodiceBack } from '../bodice-block/back'
import { IBodiceBlockShaped } from './block'

export interface IBodiceBackShaped extends IModelMap {
  centerBack: IModel,
  underarm: IModel,
  armhole: IModel,
  shoulder: IModel,
  neckline: IModel,
  shoulderDart: IModel,
  waistDart: IModel,
}

export class BodiceBackShaped implements IModel {
  public models: IBodiceBackShaped

  constructor (block: IBodiceBlockShaped) {
    const {
      centerBack,
    } = block.bodiceBlock.x
    const {
      O,
      linexB,
      lineB,
    } = block.bodiceBlock.y
    const {
      UP,
      WP,
    } = block.bodiceBlock.points

    const {
      backWaistDart,
    } = block.darts

    const back = new BodiceBack(block.bodiceBlock)

    this.models = {
      ...back.models,
      centerBack: new models.ConnectTheDots(false, [
        [centerBack, O],
        [centerBack, linexB],
        block.points.centerBackInner,
        backWaistDart.point0,
        backWaistDart.bisector,
        backWaistDart.point1,
        WP,
      ]),
      underarm: smoothCurve([
        {
          angleInDegrees: block.bodiceBlock.angles.underarmAngle,
          distance: (lineB - WP[1]) / 3,
          origin: UP,
        },
        {
          angleInDegrees: 270,
          distance: (lineB - WP[1]) / 3,
          origin: WP,
        },
      ]),
      waistDart: new models.ConnectTheDots(false, [
        backWaistDart.point0,
        backWaistDart.base,
        backWaistDart.point1,
      ]),
    }
  }
}
