import { IPoint, paths, point } from 'makerjs'

import { IAdjustedDart, IDart } from '../../helpers/dart'
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
  darts: {
    backWaistDart: IAdjustedDart,
  }
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
    lineB,
    lineW,
  } = block.y

  const WR = (block.points.WP[0] - centerBack) + (centerFront - block.points.WPf[0]) - (measurements.W / 2 + 2)
  const centerBackInner = [centerBack + 2, lineW]
  const centerFrontInner = [centerFront - 1, lineW - 1]
  const WP = point.add(block.points.WP, [-1, -0.5])
  const WPf = point.add(block.points.WPf, [1, -0.5])

  const backWaistDartBase: IPoint = [centerBack + measurements.xB / 4, lineB - 4]
  const backWaistDart: IDart = {
    base: backWaistDartBase,
    point0: [backWaistDartBase[0] - 2, WP[1]],
    point1: [backWaistDartBase[0] + 2, WP[1]],
  }

  return {
    angles: {
    },
    bodiceBlock: {
      ...block,
      points: {
        ...block.points,
        WP,
        WPf,
      },
    },
    darts: {
      backWaistDart: {
        ...backWaistDart,
        bisector: point.fromSlopeIntersection(
          new paths.Line(centerBackInner, backWaistDart.point0),
          new paths.Line(backWaistDart.base, point.add(backWaistDart.base, [0, -1])),
        ),
      },
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
