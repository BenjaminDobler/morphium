import { BaseAnimation } from "./base.animation";

export class MoveUpAnimation extends BaseAnimation {
  getFromTransformations() {
    return {
      transform: "translateY(0)"
    };
  }

  getToTransformation() {
    return {
      transform: "translateY(-100%)"
    };
  }
}
