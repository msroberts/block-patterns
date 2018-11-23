import {
  angle,
  IPoint,
  point,
} from 'makerjs'

export function pointAtAngle (start: IPoint, angleInRadians: number, distance: number): IPoint {
  return point.add(
    start,
    point.fromPolar(angleInRadians, distance),
  )
}

export function pointAtDistance (
  start: IPoint,
  direction: IPoint,
  distance: number,
  additionalAngleInRadians: number = 0,
): IPoint {
  return pointAtAngle(start, angle.ofPointInRadians(start, direction) + additionalAngleInRadians, distance)
}

export function rectanglePoints (point0: IPoint, point1: IPoint, distance: number): [IPoint, IPoint] {
  const a = angle.ofPointInRadians(point0, point1) + Math.PI / 2
  const point2 = pointAtAngle(point1, a, distance)
  const point3 = pointAtAngle(point0, a, distance)

  return [point2, point3]
}

export function rotateFn (origin: IPoint, angleInDegrees: number): (p: IPoint) => IPoint {
  return (p: IPoint) => point.rotate(p, angleInDegrees, origin)
}
