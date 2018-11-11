import { IPoint } from 'makerjs'
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
    depth: number,
    topLine: number,
  },
  points: {
    U: IPoint,
    B: IPoint,
    T: IPoint,
    F: IPoint,
    Uf: IPoint,
  }
}

export function sleeveBlock (measurements: IMeasurements, additionalWidth: number = 5): ISleeveBlock {
  const width = measurements.TA + additionalWidth
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

  return {
    angles: {
    },
    darts: {
    },
    points: {
      B,
      F,
      T,
      U,
      Uf,
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
      depth,
      topLine,
    },
  }
}
