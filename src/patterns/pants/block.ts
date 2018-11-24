import { angle, IPoint, measure, paths, point } from 'makerjs'
import { IAdjustedDart } from '../../helpers/dart'
import { pointAtAngle, pointAtDistance, rotateFn } from '../../helpers/point-angles'
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
  x: {
    WR: number,
  },
  y: {
    bottomLine: number,
    kneeLine: number,
    dartDepth: number,
  },
  darts: {
    sideDart: IAdjustedDart,
    frontDart: IAdjustedDart,
    frontDartSide: IAdjustedDart,
    backDart: IAdjustedDart,
    backDartSide: IAdjustedDart,
  },
  points: {
    O: IPoint,
    innerPointO: IPoint,
    X: IPoint,
    Y: IPoint,
    Z: IPoint,
    innerPointZ: IPoint,
    F: IPoint,
    B: IPoint,
    S: IPoint,
    S1: IPoint,
    HP: IPoint,
    HP1: IPoint,
    lineY: IPoint,
    lineYfront: IPoint,
    lineYback: IPoint,
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
  additionalWaist: number = 2,
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
  const S1 = r(S)

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

  const dartDepth = Math.min((O[1] - HP[1]) * 2 / 3, 15)
  const lineY = pointAtDistance(S, HP, dartDepth)
  const lineYfront = pointAtDistance(O, X, dartDepth)
  const lineYback = pointAtDistance(Z, Y, dartDepth)

  const waist = (measurements.W + additionalWaist) / 2
  const WR = measure.pointDistance(Z, S) + measure.pointDistance(S, O) - waist

  const dartDistance = waist / 6
  const innerPointO = point.add(O, [-1, -1])
  const frontDartBisector = pointAtDistance(innerPointO, S, dartDistance + 2)
  const frontDartSideBisector = pointAtDistance(frontDartBisector, S, dartDistance + 2)
  const innerPointZ = pointAtDistance(Z, S, 1)
  const backDartBisector = pointAtDistance(innerPointZ, S, dartDistance + 2)
  const backDartSideBisector = pointAtDistance(backDartBisector, S, dartDistance + 2)

  const centerAngle = (angle.ofPointInRadians(Z, Y) + angle.ofPointInRadians(O, X)) / 2
  const sideDartBisector = point.fromSlopeIntersection(
    new paths.Line(lineY, pointAtAngle(lineY, centerAngle, 1)),
    new paths.Line(S, innerPointO),
  )
  const sideDartWidth = WR - 10

  return {
    angles: {
    },
    darts: {
      backDart: {
        base: pointAtAngle(backDartBisector, angle.ofPointInRadians(innerPointZ, lineYback), dartDepth),
        bisector: backDartBisector,
        point0: pointAtDistance(backDartBisector, innerPointZ, 1),
        point1: pointAtDistance(backDartBisector, backDartSideBisector, 1),
      },
      backDartSide: {
        base: pointAtAngle(backDartSideBisector, centerAngle, dartDepth * 3 / 4),
        bisector: backDartSideBisector,
        point0: pointAtDistance(backDartSideBisector, backDartBisector, 1),
        point1: pointAtDistance(backDartSideBisector, S, 1),
      },
      frontDart: {
        base: pointAtAngle(frontDartBisector, Math.PI / 2 * 3, dartDepth),
        bisector: frontDartBisector,
        point0: pointAtDistance(frontDartBisector, innerPointO, 1),
        point1: pointAtDistance(frontDartBisector, frontDartSideBisector, 1),
      },
      frontDartSide: {
        base: pointAtAngle(frontDartSideBisector, Math.PI / 2 * 3, dartDepth),
        bisector: frontDartSideBisector,
        point0: pointAtDistance(frontDartSideBisector, frontDartBisector, 1),
        point1: pointAtDistance(frontDartSideBisector, S, 1),
      },
      sideDart: {
        base: lineY,
        bisector: sideDartBisector,
        point0: pointAtDistance(sideDartBisector, frontDartSideBisector, sideDartWidth / 2),
        point1: pointAtDistance(sideDartBisector, backDartSideBisector, sideDartWidth / 2),
      },
    },
    points: {
      B,
      F,
      HP,
      HP1,
      O,
      S,
      S1,
      X,
      Y,
      Z,
      h0a,
      h0b,
      h1a,
      h1b,
      innerPointO,
      innerPointZ,
      k0a,
      k0b,
      k1a,
      k1b,
      lineY,
      lineYback,
      lineYfront,
      m,
      n,
    },
    x: {
      WR,
    },
    y: {
      bottomLine,
      dartDepth,
      kneeLine,
    },
  }
}
