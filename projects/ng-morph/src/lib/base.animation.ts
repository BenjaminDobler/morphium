import { getBox, applyBox } from "./util";

export class BaseAnimation {
  fromClone: any;
  fromAnimation: any;

  constructor(from: any, options) {
    const container = document.querySelector("#morph-holder");
    from.style.visibility = "hidden";
    this.fromClone = from.cloneNode(true);
    const fromRect: any = getBox(from, { getMargins: false });
    applyBox(fromRect, this.fromClone);
    this.fromClone.style.visibility = "visible";

    const duration = 350;

    const animation = this.fromClone.animate([this.getFromTransformations(), this.getToTransformation()], { duration: parseInt(options.duration, 10) || 350, delay: options.delay || 0, easing: options.easing || "ease-in" });

    animation.onfinish = () => {
      container.removeChild(this.fromClone);
      from.style.visibility = "visible";
    };
    container.appendChild(this.fromClone);

    this.fromAnimation = animation;
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
}
