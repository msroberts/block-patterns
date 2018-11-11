import { IModel, IPoint, paths } from 'makerjs'

export function dots (points: IPoint[], startIndex: number = 0): IModel {
  const model: IModel = { paths: {} }

  for (let i = 0; i < points.length;i++) {
    model.paths![`dot${i + startIndex}`] = new paths.Circle(points[i], 0.1)
  }

  return model
}
