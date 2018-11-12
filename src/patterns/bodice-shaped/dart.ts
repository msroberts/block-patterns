import { IModel, models } from 'makerjs'
import { IDart } from '../../helpers/dart'

export function longDart (dart: IDart, lineW: number): IModel {
  const {
    base,
    point0,
    point1,
  } = dart

  return new models.ConnectTheDots(true,[
    point0,
    base,
    point1,
    [base[0], lineW - 16],
  ])
}
