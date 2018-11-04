import {
  angle,
  IPoint,
  paths,
  point,
} from 'makerjs'

import { IBlock } from '../../types/block'
import { IMeasurements } from '../../types/measurements'

import { dart, IAdjustedDart } from '../../helpers/dart'
import { pointAtAngle } from '../../helpers/point-angles'

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
    centerFront: number,
  }
  y: {
    topLine: number,
    O: number,
    lineS: number,
    lineB: number,
    lineW: number,
    linexB: number,
    lineH: number,
    neckline: number,
    lineSf: number,
    lineC: number,
  },
  points: {
    NP: IPoint,
    UP: IPoint,
    SP: IPoint,
    HP: IPoint,
    WP: IPoint,
    NPf: IPoint,
    HPf: IPoint,
    SPf: IPoint,
  },
  angles: {
    underarmAngle: number,
  },
  darts: {
    shoulderDartFront: IAdjustedDart,
  },
}

export function bodiceBlock (measurements: IBodiceMeasurements): IBodiceBlock {
  const topLine = 0
  const centerBack = 0
  const centerFront = Math.max(measurements.B / 2 + 5, measurements.H / 2 + 3)

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

  const neckline = - (measurements.B / 32 + 4.625)
  const lineSf = neckline + measurements.B / 16 - 2.75
  const lineC = lineB + 4

  const NPf: IPoint = [centerFront - Math.max(neckWidth, 6.5), topLine]

  const shoulderAngleFront = angle.ofPointInRadians(NPf, [centerFront - 16.5, lineSf])
  const shoulderDartWidthFront = measurements.B / 8 - 4
  const base: IPoint = [centerFront - measurements.Ch / 4, lineB - 2]
  const point0 = pointAtAngle(point.fromSlopeIntersection(
    new paths.Line(base, [base[0], base[1] - 1]),
    new paths.Line(NPf, pointAtAngle(NPf, shoulderAngleFront, 2)),
  ), shoulderAngleFront, 2)
  const point1 = pointAtAngle(point0, shoulderAngleFront, shoulderDartWidthFront)
  const SPf = pointAtAngle(NPf, shoulderAngleFront, measurements.S + shoulderDartWidthFront)
  const shoulderDartFront = dart({ base, point0, point1 }, NPf, SPf)

  const HPf: IPoint = [centerFront - (measurements.H / 4 + 3), lineH]

  return {
    angles: {
      underarmAngle,
    },
    darts: {
      shoulderDartFront,
    },
    points: {
      HP,
      HPf,
      NP,
      NPf,
      SP,
      SPf,
      UP,
      WP,
    },
    x: {
      backWidth,
      centerBack,
      centerFront,
      neckWidth,
    },
    y: {
      O,
      lineB,
      lineC,
      lineH,
      lineS,
      lineSf,
      lineW,
      linexB,
      neckline,
      topLine,
    },
  }
}
