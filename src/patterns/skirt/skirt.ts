import { IModel, IModelMap, models, paths } from 'makerjs'
import { arc } from '../../helpers/curve'
import { ISkirtBlock } from './block'

export class Skirt implements IModel {
  public models: IModelMap

  constructor (block: ISkirtBlock) {
    const {
      HP0,
      HP1,
      HP2,
      HP3,
      HP4,
      WP0,
      WP1,
      h0a,
      h0b,
      h1a,
      h1b,
      h2a,
      h2b,
      h3a,
      h3b,
      k0a,
      k0b,
      k1a,
      k1b,
      k2a,
      k2b,
      k3a,
      k3b,
      origin,
      y0,
      y1,
    } = block.points

    this.models = {
      hemLine: new models.ConnectTheDots(false, [
        h0a,
        h0b,
        h1a,
        h1b,
        h2a,
        h2b,
        h3a,
        h3b,
      ]),
      hipLine: new models.ConnectTheDots(false, [
        HP0,
        HP1,
        HP2,
        HP3,
        HP4,
      ]),
      innerLine0: new models.ConnectTheDots(false, [
        h0b,
        HP1,
        h1a,
      ]),
      innerLine1: new models.ConnectTheDots(false, [
        h1b,
        HP2,
        h2a,
      ]),
      innerLine2: new models.ConnectTheDots(false, [
        h2b,
        HP3,
        h3a,
      ]),
      kneeLine: new models.ConnectTheDots(false, [
        k0a,
        k0b,
        k1a,
        k1b,
        k2a,
        k2b,
        k3a,
        k3b,
      ]),
      lines: {
        paths: {
          centerBack: new paths.Line(WP1, h3b),
          centerFront: new paths.Line(WP0, h0a),
          waistLine: arc(WP1, origin, WP0),
          yokeLine: arc(y1, origin, y0),
        },
      },
    }
  }
}
