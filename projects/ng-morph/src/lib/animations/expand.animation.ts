import { BaseAnimation } from "./base.animation";

export class ExpandAnimation extends BaseAnimation {
  protected initial() {
    this.fromClone.style.transformOrigin = "50% 50%";
  }

  protected getFromTransformations() {
    return {
      opacity: 0,
      transform: 'translateZ(-150px)'
    };
  }

  protected getToTransformation() {
    return {
      opacity: 1,
      transform: 'translateZ(0)'
    };
  }
}
