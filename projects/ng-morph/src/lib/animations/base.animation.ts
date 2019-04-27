import {getBox, applyBox} from '../util';

export class BaseAnimation {
  public animations: any[] = [];
  public options: any;

  fromClone: any;
  fromAnimation: any;

  constructor(from: any, options) {
    options.duration = parseInt(options.duration, 10) || 350;
    options.delay = parseInt(options.delay, 10) || 0;
    this.options = options;

    const container = document.querySelector('#morph-holder');
    from.style.visibility = 'hidden';
    this.fromClone = from.cloneNode(true);
    const fromRect: any = getBox(from, {getMargins: false});
    applyBox(fromRect, this.fromClone);
    this.fromClone.style.visibility = 'visible';

    this.initial();

    const animation = this.fromClone.animate([this.getFromTransformations(), this.getToTransformation()], {
      duration: options.duration,
      delay: options.delay,
      easing: options.easing || 'ease-in',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      container.removeChild(this.fromClone);
      from.style.visibility = 'visible';
    };
    container.appendChild(this.fromClone);
    this.fromAnimation = animation;
    this.animations.push(animation);
  }

  protected getFromTransformations(): any {
    return {
      opacity: 0
    };
  }

  protected getToTransformation(): any {
    return {
      opacity: 1
    };
  }

  protected initial() {
  }
}
