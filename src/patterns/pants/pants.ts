import { angle, IModel, IModelMap, IPath, IPathMap, measure, models, paths, point } from 'makerjs'
import { smoothCurve } from '../../helpers/curve'
import { dartOutline } from '../../helpers/dart'
import { dots } from '../../helpers/dots'
import { IPantsBlock } from './block'

export interface IPantsLines extends IPathMap {
  creaseLineFront: IPath,
  creaseLineBack: IPath,
  kneeLineFront: IPath,
  kneeLineBack: IPath,
  sideLine: IPath,
  innerFrontSeam: IPath,
  innerBackSeam: IPath,
  lowerWaistline: IPath,
}

export interface IPants extends IModelMap {
  waistline: IModel,
  baseline: IModel,
  lowerOutline: IModel,
  upperSeamFront: IModel,
  upperSeamBack: IModel,
  lowerSeamFront: IModel,
  lowerSeamBack: IModel,
  sideDart: IModel,
  frontDart: IModel,
  frontDartSide: IModel,
  backDart: IModel,
  backDartSide: IModel,
  dots: IModel,
}

export class Pants implements IModel {
  public models: IPants
  public paths: IPantsLines

  constructor (block: IPantsBlock) {
    const {
      F,
      X,
      Y,
      B,
      O,
      S,
      S1,
      Z,
      HP,
      HP1,
      h0a,
      h0b,
      h1a,
      h1b,
      innerPointO,
      innerPointZ,
      k0a,
      k0b,
      k1a,
      k1b,
      lineYback,
      lineYfront,
      m,
      n,
    } = block.points

    const {
      frontDart,
      frontDartSide,
      backDart,
      backDartSide,
      sideDart,
    } = block.darts

    const distance = measure.pointDistance(X, Y) / 6

    this.models = {
      backDart: dartOutline(backDart),
      backDartSide: dartOutline(backDartSide),
      baseline: new models.ConnectTheDots(false, [
        F,
        X,
        Y,
        B,
      ]),
      dots: dots([
        HP,
        HP1,
        X,
        Y,
        lineYback,
        lineYfront,
        frontDart.bisector,
        frontDartSide.bisector,
        sideDart.bisector,
        backDart.bisector,
        backDartSide.bisector,
      ]),
      frontDart: dartOutline(frontDart),
      frontDartSide: dartOutline(frontDartSide),
      lowerOutline: new models.ConnectTheDots(false,[
        k0a,
        h0a,
        h0b,
        k0b,
        HP,
        k1a,
        h1a,
        h1b,
        k1b,
      ]),
      lowerSeamBack: smoothCurve([
        {
          angleInDegrees: angle.ofPointInDegrees(B, point.average(k1a, k1b)),
          distance,
          origin: B,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(k1b, h1b),
          distance,
          origin: k1b,
        },
      ]),
      lowerSeamFront: smoothCurve([
        {
          angleInDegrees: angle.ofPointInDegrees(F, point.average(k0a, k0b)),
          distance,
          origin: F,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(k0a, h0a),
          distance,
          origin: k0a,
        },
      ]),
      sideDart: dartOutline(sideDart),
      upperSeamBack: smoothCurve([
        {
          angleInDegrees: 0,
          distance: 0,
          origin: Z,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(lineYback, Y),
          distance: distance * 3 / 2,
          origin: lineYback,
        },
        {
          angleInDegrees: 180,
          distance,
          origin: B,
        },
      ]),
      upperSeamFront: smoothCurve([
        {
          angleInDegrees: 0,
          distance: 0,
          origin: O,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(O, lineYfront),
          distance: distance / 2,
          origin: lineYfront,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(S, F),
          distance: distance / 2,
          origin: F,
        },
      ]),
      waistline: smoothCurve([
        {
          angleInDegrees: angle.ofPointInDegrees(Z, sideDart.bisector),
          distance,
          origin: Z,
        },
        {
          angleInDegrees: angle.ofPointInDegrees(Z, O),
          distance,
          origin: point.average(S, point.fromSlopeIntersection(
            new paths.Line(S, O),
            new paths.Line(S1, Z),
          )),
        },
        {
          angleInDegrees: 0,
          distance,
          origin: O,
        },
      ]),
    }

    this.paths = {
      creaseLineBack: new paths.Line(n, point.average(h1a, h1b)),
      creaseLineFront: new paths.Line(m, point.average(h0a, h0b)),
      innerBackSeam: new paths.Line(innerPointZ, lineYback),
      innerFrontSeam: new paths.Line(innerPointO, lineYfront),
      kneeLineBack: new paths.Line(k1a, k1b),
      kneeLineFront: new paths.Line(k0a, k0b),
      lowerWaistline: new paths.Line(innerPointO, sideDart.bisector),
      sideLine: new paths.Line(S, HP),
    }
  }
}
