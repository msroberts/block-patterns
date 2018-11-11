import { angle, IPoint, paths, point } from 'makerjs'
import { IBlock } from '../../types/block'
import { IMeasurements } from '../../types/measurements'

export interface ISleeveMeasurements extends IMeasurements {
  TA: number,
  LA: number,
  LE: number,
  Ew: number,
  Wr: number,
}

export interface ISleeveBlock extends IBlock {
  x: {
    width: number,
    lineU: number,
    lineB: number,
    lineT: number,
    lineF: number,
    lineUf: number,
  },
  y: {
    balanceUpper: number,
    balanceLower: number,
    height: number,
    depth: number,
    topLine: number,
  },
  points: {
    U: IPoint,
    B: IPoint,
    T: IPoint,
    F: IPoint,
    Uf: IPoint,
    E: IPoint,
    Ul: IPoint,
    Bl: IPoint,
    Tl: IPoint,
    Fl: IPoint,
    Ufl: IPoint,
  },
  angles: {
    lowerAngle: number,
  },
}

export function sleeveBlock (measurements: IMeasurements, additionalWidth: number = 5): ISleeveBlock {
  const width = measurements.TA + additionalWidth
  const height = measurements.LA - 1
  const depth = measurements.TA / 4 + 5.5

  const lineU = 0
  const lineB = lineU + width / 4
  const lineT = lineU + width / 2
  const lineF = lineU + width * 3 / 4
  const lineUf = lineU + width

  const topLine = 0
  const U: IPoint = [lineU, topLine - depth]
  const B: IPoint = [lineB, topLine - measurements.TA / 6 - 1 / 3]
  const T: IPoint = [lineT, topLine]
  const F: IPoint = [lineF, topLine - 6]
  const Uf: IPoint = [lineUf, U[1]]

  const Bl: IPoint = [lineB, topLine - height]
  const Fl: IPoint = [lineF, topLine - height + 2.5]
  const Tl = point.fromSlopeIntersection(
    new paths.Line(Bl, Fl),
    new paths.Line(T, [lineT, topLine - 2]),
  )
  const Ul = [lineU, Tl[1]]
  const Ufl = [lineUf, Tl[1]]

  const E: IPoint = [
    lineB,
    topLine - (measurements.LE ** 2 - (lineT - lineB) ** 2) ** (1 / 2),
  ]

  const balanceUpper = E[1] + 7.5
  const balanceLower = E[1] - 5

  const lowerAngle = angle.ofPointInRadians(Bl, Fl)

  return {
    angles: {
      lowerAngle,
    },
    darts: {
    },
    points: {
      B,
      Bl,
      E,
      F,
      Fl,
      T,
      Tl,
      U,
      Uf,
      Ufl,
      Ul,
    },
    x: {
      lineB,
      lineF,
      lineT,
      lineU,
      lineUf,
      width,
    },
    y: {
      balanceLower,
      balanceUpper,
      depth,
      height,
      topLine,
    },
  }
}
