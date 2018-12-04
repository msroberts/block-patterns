import { IModel, IModelMap, IPath, IPathMap, measure, models, paths } from 'makerjs'
import { IHoodBlock } from './block'

export interface IHood extends IModelMap {
  outline: IModel,
}

export interface IHoodLines extends IPathMap {
  lineD: IPath,
  lineE: IPath,
  round: IPath,
}

export class Hood implements IModel {
  public models: IHood
  public paths: IHoodLines

  constructor (block: IHoodBlock) {
    const {
      A,
      B,
      C,
      D,
      E,
      F,
    } = block.points

    const arcSize = measure.pointDistance(A, E)

    this.models = {
      outline: new models.ConnectTheDots(true, [
        A,
        B,
        C,
        F,
      ]),
    }

    this.paths = {
      lineD: new paths.Line(C, D),
      lineE: new paths.Line(E, [C[0], E[1]]),
      round: new paths.Arc([B[0] + arcSize, E[1]], arcSize, 90, 180),
    }
  }
}
