import { IPoint } from 'makerjs'
import { pointAtAngle } from '../../helpers/point-angles'
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
    sectionWidth: number,
  },
  y: {
    lineW: number,
    lineY: number,
    lineH: number,
    lineK: number,
    hemline: number,
  },
  angles: {
    innerAngle: number,
    a0: number,
    a1: number,
    a2: number,
    a3: number,
  },
  points: {
    HP0: IPoint,
    HP1: IPoint,
    HP2: IPoint,
    HP3: IPoint,
    HP4: IPoint,
  }
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

  const distanceK = lineH - lineK
  const spreadDistance = measurements.H / 60
  const innerAngle = 2 * Math.sin(spreadDistance / 2 / distanceK)

  const a0 = Math.PI
  const a1 = a0 - innerAngle
  const a2 = a1 - innerAngle
  const a3 = a2 - innerAngle

  const sectionWidth = width / 4

  const HP0: IPoint = [centerFront, lineH]
  const HP1 = pointAtAngle(HP0, a0, sectionWidth)
  const HP2 = pointAtAngle(HP1, a1, sectionWidth)
  const HP3 = pointAtAngle(HP2, a2, sectionWidth)
  const HP4 = pointAtAngle(HP3, a3, sectionWidth)

  return {
    angles: {
      a0,
      a1,
      a2,
      a3,
      innerAngle,
    },
    darts: {
    },
    points: {
      HP0,
      HP1,
      HP2,
      HP3,
      HP4,
    },
    x: {
      centerFront,
      sectionWidth,
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
