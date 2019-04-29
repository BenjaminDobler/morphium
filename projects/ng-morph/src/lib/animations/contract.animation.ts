import { BaseAnimation } from "./base.animation";

export class ContractAnimation extends BaseAnimation {
  protected initial() {
    this.fromClone.style.transformOrigin = "50% 50%";
  }

  protected getFromTransformations() {
    return {
      opacity: 1,
      transform: 'translateZ(0)'
    };
  }

  protected getToTransformation() {
    return {
      opacity: 0,
      transform: 'translateZ(-150px)'
    };
  }
}
