import { IPoint, point } from 'makerjs'
import { IBlock } from '../../types/block'
import { IMeasurements } from '../../types/measurements'

export interface IPantsMeasurements extends IMeasurements {
  H: number,
  W: number,
  SideLength: number,
  Rise: number,
}

export interface IPantsBlock extends IBlock {
  points: {
    O: IPoint,
    X: IPoint,
    Y: IPoint,
    Z: IPoint,
    F: IPoint,
    B: IPoint,
    S: IPoint,
    HP: IPoint,
  }
}

export function pantsBlock (
  measurements: IPantsMeasurements,
  additionalWidth: number = 6,
  fitAmount: number = 4,
): IPantsBlock {
  const width = (measurements.H + additionalWidth) / 2
  const O: IPoint = [0, 0]
  const X = point.add(O, [0, -measurements.Rise])
  const Z = point.add(O, [-width, 0])
  const Y: IPoint = [Z[0], X[1]]

  const S: IPoint = point.average(O, Z)
  const HP = point.add(S, [0, -Math.min(22, measurements.Rise - 5)])

  const F = point.add(X, [Math.max(measurements.H / 10 - 5, 4), 0])
  const B = point.add(F, [-(measurements.H * 3 / 4 - fitAmount), -1.5])

  return {
    angles: {
    },
    darts: {
    },
    points: {
      B,
      F,
      HP,
      O,
      S,
      X,
      Y,
      Z,
    },
    x: {
    },
    y: {
    },
  }
}
