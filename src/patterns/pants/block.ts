import { angle, IPoint, point } from 'makerjs'
import { rotateFn } from '../../helpers/point-angles'
import { IBlock } from '../../types/block'
import { IMeasurements } from '../../types/measurements'

export interface IPantsMeasurements extends IMeasurements {
  H: number,
  W: number,
  SideLength: number,
  Rise: number,
  KneeWidth: number,
}

export interface IPantsBlock extends IBlock {
  y: {
    bottomLine: number,
    kneeLine: number,
  },
  points: {
    O: IPoint,
    X: IPoint,
    Y: IPoint,
    Z: IPoint,
    F: IPoint,
    B: IPoint,
    S: IPoint,
    HP: IPoint,
    HP1: IPoint,
    m: IPoint,
    n: IPoint,
    k0a: IPoint,
    k0b: IPoint,
    k1a: IPoint,
    k1b: IPoint,
    h0a: IPoint,
    h0b: IPoint,
    h1a: IPoint,
    h1b: IPoint,
  }
}

export function pantsBlock (
  measurements: IPantsMeasurements,
  additionalWidth: number = 6,
  fitAmount: number = 4,
  kneeWidth: number = 8,
): IPantsBlock {
  const width = (measurements.H + additionalWidth) / 2
  const bottomLine = -measurements.SideLength
  const O: IPoint = [0, 0]
  const X = point.add(O, [0, -measurements.Rise])
  let Z = point.add(O, [-width, 0])
  const Y: IPoint = [Z[0], X[1]]

  const S: IPoint = point.average(O, Z)
  const HP = point.add(S, [0, -Math.min(22, measurements.Rise - 5)])

  const r = rotateFn(HP, angle.toDegrees(Math.asin(1.5 / (HP[0] - Y[0]) * -2)))
  Z = r(Z)
  const HP1 = r([Y[0], HP[1]])

  const F = point.add(X, [Math.max(measurements.H / 10 - 5, 4), 0])
  const B = point.add(F, [-(measurements.H * 3 / 4 - fitAmount), -1.5])

  const creaseLine = (F[0] - HP[0]) / 2

  const m = point.add(F, [-creaseLine, 0])
  const n = point.add(m, [-creaseLine * 2,0])
  const kneeLine = (X[1] + bottomLine) / 2 + 4
  const quarterKneeWidth = (measurements.KneeWidth + kneeWidth) / 4

  const k0a: IPoint = [m[0] + quarterKneeWidth, kneeLine]
  const k0b: IPoint = [m[0] - quarterKneeWidth, kneeLine]
  const k1a: IPoint = [n[0] + quarterKneeWidth, kneeLine]
  const k1b: IPoint = [n[0] - quarterKneeWidth, kneeLine]

  const h0a: IPoint = [k0a[0], bottomLine]
  const h0b: IPoint = [k0b[0], bottomLine]
  const h1a: IPoint = [k1a[0], bottomLine]
  const h1b: IPoint = [k1b[0], bottomLine]

  return {
    angles: {
    },
    darts: {
    },
    points: {
      B,
      F,
      HP,
      HP1,
      O,
      S,
      X,
      Y,
      Z,
      h0a,
      h0b,
      h1a,
      h1b,
      k0a,
      k0b,
      k1a,
      k1b,
      m,
      n,
    },
    x: {
    },
    y: {
      bottomLine,
      kneeLine,
    },
  }
}
