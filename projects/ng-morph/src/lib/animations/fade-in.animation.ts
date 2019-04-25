import { BaseAnimation } from "./base.animation";

export class FadeInAnimation extends BaseAnimation {
  initial() {
    this.fromClone.style.opacity = 0;
  }

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
