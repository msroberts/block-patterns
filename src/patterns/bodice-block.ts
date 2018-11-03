import {
  IModel,
  IModelMap,
  IPoint,
  models,
  paths,
  point,
} from 'makerjs'

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
    neckWidth: number,
    backWidth: number,
  }
  y: {
    O: number,
    lineS: number,
    lineB: number,
    lineW: number,
    linexB: number,
    lineH: number,
  },
  points: {
    NP: IPoint,
    UP: IPoint,
    SP: IPoint,
    HP: IPoint,
    WP: IPoint,
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

  const neckWidth = measurements.B / 16 + 1.25
  const NP: IPoint = [neckWidth, O + 2]

  const backWidth = measurements.xB / 2
  const UP: IPoint = [backWidth + measurements.B / 16, lineB]
  const SP: IPoint = [backWidth + 2, lineS]

  const HP: IPoint = [measurements.H / 4, lineH]
  const WP = point.fromSlopeIntersection(
    new paths.Line([UP, HP]),
    new paths.Line([[0, lineW], [2, lineW]]),
  )
  WP[0] -= 2

  return {
    points: {
      HP,
      NP,
      SP,
      UP,
      WP,
    },
    x: {
      backWidth,
      centerBack,
      neckWidth,
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
  shoulder: IModel,
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
    const {
      HP,
      NP,
      SP,
    } = block.points

    this.models = {
      centerBack : new models.ConnectTheDots(false, [
        [centerBack, O],
        [centerBack, lineH],
        HP,
      ]),
      shoulder: new models.ConnectTheDots(false, [
        NP,
        SP,
      ]),
    }
  }
}
