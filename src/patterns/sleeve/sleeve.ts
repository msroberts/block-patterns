import { angle, IModel, IModelMap, paths } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { dots } from '../../helpers/dots'
import { ISleeveBlock } from './block'

export interface ISleeve extends IModelMap {
  crown: IModel,
  outline: IModel,
  lowerEdge: IModel,
  dots: IModel,
  lines: IModel,
}

export class Sleeve implements IModel {
  public models: ISleeve

  constructor (block: ISleeveBlock) {
    const {
      U,
      B,
      T,
      F,
      Uf,
      E,
      Ul,
      Bl,
      Tl,
      Fl,
      Ufl,
    } = block.points
    const {
      lineU,
      lineT,
      lineUf,
    } = block.x
    const {
      balanceUpper,
      balanceLower,
    } = block.y

    const distance = (B[0] - U[0]) * 3 / 8
    const angleInDegrees = angle.toDegrees(block.angles.lowerAngle)

    this.models = {
      crown: smoothCurve([
        {
          angleInDegrees: 0,
          distance,
          origin: U,
        },
        {
          angleInDegrees: 52.5,
          distance,
          origin: B,
        },
        {
          angleInDegrees: 0,
          distance: distance * 7 / 6,
          origin: T,
        },
        {
          angleInDegrees: -67.5,
          distance,
          origin: F,
        },
        {
          angleInDegrees: 0,
          distance,
          origin: Uf,
        },
      ]),
      dots: dots([
        U,
        B,
        T,
        F,
        Uf,
        E,
      ]),
      lines: {
        paths: {
          balanceLower: new paths.Line([lineU, balanceLower], [lineUf, balanceLower]),
          balanceUpper: new paths.Line([lineU, balanceUpper], [lineUf, balanceUpper]),
          lineB: new paths.Line(B, Bl),
          lineE: new paths.Line(T, E),
          lineEh: new paths.Line([lineU, E[1]], [lineT, E[1]]),
          lineF: new paths.Line(F, Fl),
          lineT: new paths.Line(T, Tl),
          lineU: new paths.Line(U, Ul),
          lineUf: new paths.Line(Uf, Ufl),
        },
      },
      lowerEdge: smoothCurve([
        {
          angleInDegrees: 360 - angleInDegrees,
          distance,
          origin: Ul,
        },
        {
          angleInDegrees: 0,
          distance,
          origin: Bl,
        },
        {
          angleInDegrees,
          distance: 0,
          origin: Tl,
        },
        {
          angleInDegrees: 0,
          distance,
          origin: Fl,
        },
        {
          angleInDegrees: 360 - angleInDegrees,
          distance,
          origin: Ufl,
        },
      ]),
      outline: {
        paths: {
          back: new paths.Line(U, Ul),
          front: new paths.Line(Uf, Ufl),
        },
      },
    }
  }
}
