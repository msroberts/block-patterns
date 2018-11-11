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
          angleInDegrees: 45,
          distance,
          origin: B,
        },
        {
          angleInDegrees: 0,
          distance,
          origin: T,
        },
        {
          angleInDegrees: -60,
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
          lineB: new paths.Line(B, Bl),
          lineE: new paths.Line(T, E),
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
