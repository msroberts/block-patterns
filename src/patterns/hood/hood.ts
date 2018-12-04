import { IModel, IModelMap, IPath, IPathMap, models, paths } from 'makerjs'
import { IHoodBlock } from './block'

export interface IHood extends IModelMap {
  outline: IModel,
}

export interface IHoodLines extends IPathMap {
  lineD: IPath,
  lineE: IPath,
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
    }
  }
}
