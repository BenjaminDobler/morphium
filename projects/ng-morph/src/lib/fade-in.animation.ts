import { getBox, applyBox } from "./util";
import { BaseAnimation } from "./base.animation";

export class FadeInAnimation extends BaseAnimation {
  protected getFromTransformations() {
    return {
      opacity: 0
    };
  }

  protected getToTransformation() {
    return {
      opacity: 1
    };
  }
}
