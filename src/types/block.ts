import { IPoint } from 'makerjs'
import { IAdjustedDart } from '../helpers/dart'

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
  angles: {
    [key: string]: number,
  }
  darts: {
    [key: string]: IAdjustedDart,
  }
}
