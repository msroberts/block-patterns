import {
  angle,
  IModel,
  IModelMap,
  IPoint,
  models,
  paths,
  point,
} from 'makerjs'

import { IBlock } from '../types/block'
import { IMeasurements } from '../types/measurements'

import { smoothCurve } from '../helpers/curve'
import { pointAtAngle } from '../helpers/point-angles'

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
  angles: {
    underarmAngle: number,
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

  const underarmAngle = angle.ofPointInDegrees(UP, pointAtAngle(
    WP,
    angle.toRadians(90),
    (lineB - lineW) / 2,
  ))

  return {
    angles: {
      underarmAngle,
    },
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
  underarm: IModel,
  armhole: IModel,
  shoulder: IModel,
  neckline: IModel,
}

export class BodiceBack implements IModel {
  public models: IBodiceBack

  constructor (public block: IBodiceBlock) {
    const {
      centerBack,
      backWidth,
    } = block.x
    const {
      O,
      linexB,
      lineB,
      lineH,
    } = block.y
    const {
      HP,
      NP,
      SP,
      UP,
      WP,
    } = block.points
    const {
      underarmAngle,
    } = block.angles

    const armholePoint: IPoint = [centerBack + backWidth, linexB]

    const shoulderAngle = angle.ofPointInDegrees(NP, SP)

    this.models = {
      armhole: smoothCurve([
        {
          angleInDegrees: Math.min(shoulderAngle, angle.ofPointInDegrees(SP, armholePoint)),
          distance: (SP[1] - linexB) / 3,
          origin: SP,
        },
        {
          angleInDegrees: 270,
          distance: (linexB - lineB) / 2,
          origin: armholePoint,
        },
        {
          angleInDegrees: underarmAngle + 90,
          distance: (UP[0] - armholePoint[0]) / 2,
          origin: UP,
        },
      ]),
      centerBack : new models.ConnectTheDots(false, [
        [centerBack, O],
        [centerBack, lineH],
        HP,
      ]),
      neckline: smoothCurve([
        {
          angleInDegrees: shoulderAngle - 90,
          distance: NP[1] - O,
          origin: NP,
        },
        {
          angleInDegrees: 180,
          distance: (NP[0] - centerBack) / 2,
          origin: [centerBack, O],
        },
      ]),
      shoulder: new models.ConnectTheDots(false, [
        NP,
        SP,
      ]),
      underarm: smoothCurve([
        {
          angleInDegrees: underarmAngle,
          distance: (lineB - WP[1]) / 2,
          origin: UP,
        },
        {
          angleInDegrees: 270,
          distance: (lineB - WP[1]) / 3,
          origin: WP,
        },
        {
          angleInDegrees: 270,
          distance: (WP[1] - lineH) / 3,
          origin: HP,
        },
      ]),
    }
  }
}
