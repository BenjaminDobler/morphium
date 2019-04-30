import {BaseAnimation} from './base.animation';

export class EnterUp extends BaseAnimation {

  protected initial() {
    this.fromClone.style.opacity = 0;
  }

  getFromTransformations() {
    return {
      transform: 'translateY(100%)',
      opacity: 0
    };
  }

  getToTransformation() {
    return {
      transform: 'translateY(0)',
      opacity: 1
    };
  }
}
