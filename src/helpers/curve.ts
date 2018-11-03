import { angle, IModel, IPoint, models } from 'makerjs'
import { pointAtAngle } from './point-angles'

export interface ICurvePoint {
  origin: IPoint,
  angleInDegrees: number,
  distance: number,
}

export function smoothCurve (points: ICurvePoint[]): IModel {
  const m: IModel = { models: {} }

  if (points.length < 2) {
    return m
  }

  for (let i = 1;i < points.length;i++) {
    const start = points[i - 1]
    const end = points[i]
    m.models![`curve${i}`] = new models.BezierCurve(
      start.origin,
      pointAtAngle(start.origin, angle.toRadians(start.angleInDegrees), start.distance),
      pointAtAngle(end.origin, angle.toRadians(end.angleInDegrees + 180), end.distance),
      end.origin,
    )
  }

  return m
}
