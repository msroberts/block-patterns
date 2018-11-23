import { angle, IPoint, measure, paths, point } from 'makerjs'
import { arc } from '../../helpers/curve'
import { pointAtAngle, pointAtDistance, rectanglePoints } from '../../helpers/point-angles'
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
    waist: number,
    WR: number,
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
    centerAngle: number,
  },
  points: {
    HP0: IPoint,
    HP1: IPoint,
    HP2: IPoint,
    HP3: IPoint,
    HP4: IPoint,
    k0a: IPoint,
    k0b: IPoint,
    k1a: IPoint,
    k1b: IPoint,
    k2a: IPoint,
    k2b: IPoint,
    k3a: IPoint,
    k3b: IPoint,
    h0a: IPoint,
    h0b: IPoint,
    h1a: IPoint,
    h1b: IPoint,
    h2a: IPoint,
    h2b: IPoint,
    h3a: IPoint,
    h3b: IPoint,
    WP0: IPoint,
    WP1: IPoint,
    y0: IPoint,
    y1: IPoint,
    origin: IPoint,
    centerW: IPoint,
    centerWback: IPoint,
    centerWfront: IPoint,
    centerHem: IPoint,
  }
}

export function skirtBlock (
  measurements: ISkirtMeasurments,
  additionalWidth: number = 6,
  additionalWaist: number = 4,
): ISkirtBlock {
  const length = 65
  const width = (measurements.H + additionalWidth) / 2
  const waist = (measurements.W + additionalWaist) / 2

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

  const [k0b, k0a] = rectanglePoints(HP0, HP1, lineH - lineK)
  const [k1b, k1a] = rectanglePoints(HP1, HP2, lineH - lineK)
  const [k2b, k2a] = rectanglePoints(HP2, HP3, lineH - lineK)
  const [k3b, k3a] = rectanglePoints(HP3, HP4, lineH - lineK)

  const [h0b, h0a] = rectanglePoints(HP0, HP1, lineH - hemline)
  const [h1b, h1a] = rectanglePoints(HP1, HP2, lineH - hemline)
  const [h2b, h2a] = rectanglePoints(HP2, HP3, lineH - hemline)
  const [h3b, h3a] = rectanglePoints(HP3, HP4, lineH - hemline)

  const WP0: IPoint = [centerFront, lineW]
  const WP1 = rectanglePoints(HP4, HP3, lineW - lineH)[1]

  const origin = point.fromSlopeIntersection(
    new paths.Line(h0a, WP0),
    new paths.Line(h3b, WP1),
  )

  const y0: IPoint = [centerFront, lineY]
  const y1 = rectanglePoints(HP4, HP3, lineY - lineH)[1]

  const centerAngle = (angle.ofPointInRadians(origin, WP0) + angle.ofPointInRadians(origin, WP1)) / 2
  const centerW = pointAtAngle(HP2, centerAngle, lineH - lineW)
  const centerHem = pointAtAngle(HP2, centerAngle, lineH - hemline)

  const WR = measure.pathLength(arc(WP1, origin, WP0)) - waist
  const dartWidth = WR / 2
  const centerWfront = pointAtDistance(centerW, WP0, dartWidth / 2)
  const centerWback = pointAtDistance(centerW, WP1, dartWidth / 2)

  return {
    angles: {
      a0,
      a1,
      a2,
      a3,
      centerAngle,
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
      WP0,
      WP1,
      centerHem,
      centerW,
      centerWback,
      centerWfront,
      h0a,
      h0b,
      h1a,
      h1b,
      h2a,
      h2b,
      h3a,
      h3b,
      k0a,
      k0b,
      k1a,
      k1b,
      k2a,
      k2b,
      k3a,
      k3b,
      origin,
      y0,
      y1,
    },
    x: {
      WR,
      centerFront,
      sectionWidth,
      waist,
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
