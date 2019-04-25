import { BaseAnimation } from "./base.animation";

export class MoveDownAnimation extends BaseAnimation {
  getFromTransformations() {
    return {
      transform: "translateY(-100%)"
    };
  }

  getToTransformation() {
    return {
      transform: "translateY(0)"
    };
  }
}
