import { IModel, IModelMap, models } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { dots } from '../../helpers/dots'
import { BodiceFront } from '../bodice-block/front'
import { IBodiceBlockShaped } from './block'

export interface IBodiceFrontShaped extends IModelMap {
  centerFront: IModel,
  neckline: IModel,
  shoulder: IModel,
  armhole: IModel,
  underarm: IModel,
  shoulderDart: IModel,
  waistDart: IModel,
  dotsShaped: IModel,
}

export class BodiceFrontShaped implements IModel {
  public models: IBodiceFrontShaped

  constructor (block: IBodiceBlockShaped) {
    const front = new BodiceFront(block.bodiceBlock)

    const {
      centerFront,
    } = block.bodiceBlock.x
    const {
      neckline,
      lineC,
    } = block.bodiceBlock.y
    const {
      WPf,
      UPf,
    } = block.bodiceBlock.points
    const {
      underarmAngle,
    } = block.bodiceBlock.angles
    const {
      centerFrontInner,
    } = block.points
    const {
      frontWaistDart,
    } = block.darts

    this.models = {
      ...front.models,
      centerFront: new models.ConnectTheDots(false, [
        [centerFront, neckline],
        [centerFront, lineC],
        centerFrontInner,
        frontWaistDart.point0,
        frontWaistDart.bisector,
        frontWaistDart.point1,
        WPf,
      ]),
      dotsShaped: dots([
        [centerFront, lineC],
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
      ]),
      waistDart: new models.ConnectTheDots(false, [
        frontWaistDart.point0,
        frontWaistDart.base,
        frontWaistDart.point1,
      ]),
    }
  }
}
