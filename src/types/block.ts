import { IPoint } from 'makerjs'

export interface IBlock {
  x: {
    [key: string]: number,
  },
  y: {
    [key: string]: number,
  },
  points: {
    [key: string]: IPoint,
  },
}
