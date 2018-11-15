import { IBlock } from '../../types/block'
import { IMeasurements } from '../../types/measurements'

export interface ISkirtMeasurments extends IMeasurements {
  H: number,
  W: number,
}

export interface ISkirtBlock extends IBlock {
  x: {
    centerFront: number,
    width: number,
  },
  y: {
    lineW: number,
    lineY: number,
    lineH: number,
    lineK: number,
    hemline: number,
  },
}

export function skirtBlock (measurements: ISkirtMeasurments, additionalWidth: number = 6): ISkirtBlock {
  const length = 65
  const width = (measurements.H + additionalWidth) / 2

  const centerFront = 0
  const lineW = 0
  const hemline = lineW - length
  const lineY = lineW - 15
  const lineH = lineW - 22
  const lineK = lineW - 52

  return {
    angles: {
    },
    darts: {
    },
    points: {
    },
    x: {
      centerFront,
      width,
    },
    y: {
      hemline,
      lineH,
      lineK,
      lineW,
      lineY,
    },
  }
}
