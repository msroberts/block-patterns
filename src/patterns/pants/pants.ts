import { angle, IModel, IModelMap, measure, models, paths, point } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { IPantsBlock } from './block'

export interface IPants extends IModelMap {
  waistline: IModel,
  baseline: IModel,
  lowerOutline: IModel,
}

export class Pants implements IModel {
  public models: IPants

  constructor (block: IPantsBlock) {
    const {
      F,
      X,
      Y,
      B,
      O,
      S,
      S1,
      Z,
      HP,
      h0a,
      h0b,
      h1a,
      h1b,
      k0a,
      k0b,
      k1a,
      k1b,
    } = block.points

    const distance = measure.pointDistance(X, Y) / 6

    this.models = {
      baseline: new models.ConnectTheDots(false, [
        F,
        X,
        Y,
        B,
      ]),
      lowerOutline: new models.ConnectTheDots(false,[
        k0a,
        h0a,
        h0b,
        k0b,
        HP,
        k1a,
        h1a,
        h1b,
        k1b,
      ]),
      waistline: smoothCurve([
        {
          angleInDegrees: angle.ofPointInDegrees(Z, S) * 2,
          distance,
          origin: Z,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(Z, O),
          distance,
          origin: point.average(S, point.fromSlopeIntersection(
            new paths.Line(S, O),
            new paths.Line(S1, Z),
          )),
        },
        {
          angleInDegrees: 0,
          distance,
          origin: O,
        },
      ]),
    }
  }
}
