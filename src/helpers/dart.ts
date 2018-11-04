import { angle, IPoint, measure, paths, point } from 'makerjs'
import { pointAtDistance } from './point-angles'

export interface IDart {
  base: IPoint,
  point0: IPoint,
  point1: IPoint,
}

export interface IAdjustedDart extends IDart {
  bisector: IPoint,
}

const {
  abs,
  acos,
  cos,
  max,
  PI,
  sin,
} = Math

export function dart (
  {
    base,
    point0,
    point1,
  }: IDart,
  outerPoint0: IPoint,
  outerPoint1: IPoint,
): IAdjustedDart {
  const outerDistance0 = measure.pointDistance(base, outerPoint0)
  const outerDistance1 = measure.pointDistance(base, outerPoint1)
  const outerAngle0 = abs(
    angle.ofPointInRadians(base, outerPoint0) -
    angle.ofPointInRadians(base, point0),
  )
  const outerAngle1 = abs(
    angle.ofPointInRadians(base, outerPoint1) -
    angle.ofPointInRadians(base, point1),
  )
  const topDistanceSquared = outerDistance0 ** 2 + outerDistance1 ** 2 -
    2 * outerDistance0 * outerDistance1 * cos(outerAngle0 + outerAngle1)
  const cornerAngle0 = acos(
    (outerDistance0 ** 2 + topDistanceSquared - outerDistance1 ** 2) /
    (2 * outerDistance0 * topDistanceSquared ** .5),
  )
  const dartLength = outerDistance0 / sin(PI - cornerAngle0 - outerAngle0) * sin(cornerAngle0)
  const newDart: IDart = {
    base,
    point0: pointAtDistance(base, point0, dartLength),
    point1: pointAtDistance(base, point1, dartLength),
  }
  const bisectorLine = new paths.Line(base, point.add(
    base,
    point.fromPolar((
      angle.ofPointInRadians(base, point0) +
      angle.ofPointInRadians(base, point1)
    ) / 2, 2),
  ))
  const bisectorLength = max(
    measure.pointDistance(base, point.fromSlopeIntersection(
      bisectorLine,
      new paths.Line(outerPoint0, newDart.point0),
    )),
    measure.pointDistance(base, point.fromSlopeIntersection(
      bisectorLine,
      new paths.Line(outerPoint1, newDart.point1),
    )),
  )
  return {
    bisector: pointAtDistance(base, bisectorLine.end, bisectorLength),
    ...newDart,
  }
}
