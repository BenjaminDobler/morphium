import { BaseAnimation } from "./base.animation";

export class FadeOutAnimation extends BaseAnimation {
  protected initial() {
    this.fromClone.style.opacity = 1;
  }

  protected getFromTransformations() {
    return {
      opacity: 1
    };
  }

  protected getToTransformation() {
    return {
      opacity: 0
    };
  }
}
