import {BaseAnimation} from './base.animation';

export class LeaveDown extends BaseAnimation {
  getFromTransformations() {
    return {
      transform: 'translateY(0)',
      opacity: 1
    };
  }

  getToTransformation() {
    return {
      transform: 'translateY(100%)',
      opacity: 0
    };
  }
}
