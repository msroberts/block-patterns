import { IModel, IModelMap, models } from 'makerjs'

import { IBlock } from '../types/block'
import { IMeasurements } from '../types/measurements'

export interface IBodiceMeasurements extends IMeasurements {
  B: number,
  H: number,
  W: number,
  LW: number,
  xB: number,
  Ch: number,
  S: number,
  TA: number,
  LA: number,
  LE: number,
  Ew: number,
  Wr: number,
}

export interface IBodiceBlock extends IBlock {
  x: {
    centerBack: number,
  }
  y: {
    O: number,
    lineS: number,
    lineB: number,
    lineW: number,
    linexB: number,
    lineH: number,
  },
}

export function bodiceBlock (measurements: IBodiceMeasurements): IBodiceBlock {
  const centerBack = 0

  const O = -measurements.B / 16 + 2.75
  const lineS = O - 3
  const lineB = O - measurements.B / 8 - 10
  const lineW = O - measurements.LW
  const linexB = lineS - (lineS - lineB) / 2
  const lineH = lineW - 22

  return {
    points: {
    },
    x: {
      centerBack,
    },
    y: {
      O,
      lineB,
      lineH,
      lineS,
      lineW,
      linexB,
    },
  }
}

export interface IBodiceBack extends IModelMap {
  centerBack: IModel,
}

export class BodiceBack implements IModel {
  public models: IBodiceBack

  constructor (public block: IBodiceBlock) {
    const {
      centerBack,
    } = block.x
    const {
      O,
      lineH,
    } = block.y

    this.models = {
      centerBack : new models.ConnectTheDots(false, [
        [centerBack, O],
        [centerBack, lineH],
      ]),
    }
  }
}
