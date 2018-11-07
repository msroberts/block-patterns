import { IPoint, point } from 'makerjs'

import { IBlock } from '../../types/block'
import { IBodiceBlock, IBodiceMeasurements } from '../bodice-block/block'

export interface IBodiceBlockShaped extends IBlock {
  x: {
    WR: number,
  },
  points: {
    centerBackInner: IPoint,
    centerFrontInner: IPoint,
  },
  bodiceBlock: IBodiceBlock,
}

export function bodiceBlockShaped (
  block: IBodiceBlock,
  measurements: IBodiceMeasurements,
): IBodiceBlockShaped {
  const {
    centerBack,
    centerFront,
  } = block.x
  const {
    lineW,
  } = block.y

  const WR = (block.points.WP[0] - centerBack) + (centerFront - block.points.WPf[0]) - (measurements.W / 2 + 2)
  const centerBackInner = [centerBack + 2, lineW]
  const centerFrontInner = [centerFront - 1, lineW - 1]
  const WP = point.add(block.points.WP, [-1, -0.5])
  const WPf = point.add(block.points.WPf, [1, -0.5])

  const points = {
    WP,
    WPf,
    ...block.points,
  }

  return {
    angles: {
    },
    bodiceBlock: {
      points,
      ...block,
    },
    darts: {
    },
    points: {
      centerBackInner,
      centerFrontInner,
    },
    x: {
      WR,
    },
    y: {
    },
  }
}
