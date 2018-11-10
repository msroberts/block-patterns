import { IModel, IModelMap, models } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { BodiceFront } from '../bodice-block/front'
import { IBodiceBlockShaped } from './block'

export interface IBodiceFrontShaped extends IModelMap {
  centerFront: IModel,
  neckline: IModel,
  shoulder: IModel,
  armhole: IModel,
  underarm: IModel,
  shoulderDart: IModel,
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

    this.models = {
      ...front.models,
      centerFront: new models.ConnectTheDots(false, [
        [centerFront, neckline],
        [centerFront, lineC],
        centerFrontInner,
        WPf,
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
    }
  }
}
