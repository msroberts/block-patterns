import { IPoint, point } from 'makerjs'
import { IBlock } from '../../types/block'
import { IMeasurements } from '../../types/measurements'

export interface IHoodMeasurements extends IMeasurements {
  hoodHeight: number,
  hoodExtendedHeight: number,
  hoodDepth: number,
  hoodOverhead: number,
}

export interface IHoodBlock extends IBlock {
  points: {
    A: IPoint,
    B: IPoint,
    C: IPoint,
    D: IPoint,
    E: IPoint,
    F: IPoint,
  },
  x: {
    depth: number,
  },
  y: {
    frontHeight: number,
    backHeight: number,
  },
}

export function hoodBlock (
  measurements: IHoodMeasurements,
  additionalDepth: number = 2,
): IHoodBlock {
  const depth = measurements.hoodDepth / 2 + additionalDepth
  const backHeight = measurements.hoodHeight / 2
  const frontHeight = measurements.hoodExtendedHeight / 2

  const A: IPoint = [0,0]
  const B = point.add(A, [-depth, 0])
  const C = point.add(B, [0, -backHeight])
  const D: IPoint = [A[0], C[1]]
  const E = point.average(A, D)
  const F = point.add(A, [0, -frontHeight])

  return {
    angles: {
    },
    darts: {
    },
    points: {
      A,
      B,
      C,
      D,
      E,
      F,
    },
    x: {
      depth,
    },
    y: {
      backHeight,
      frontHeight,
    },
  }
}
