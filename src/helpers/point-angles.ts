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
