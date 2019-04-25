import { getBox, applyBox } from "./util";

async function wait(t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export class BaseAnimation {
  fromClone: any;

  fromAnimation: any;

  constructor(from: any, fromTransform, toTransform) {
    this.fromClone = from.cloneNode(true);
    const fromRect: any = getBox(from, { getMargins: false });
    applyBox(fromRect, this.fromClone);
    this.fromClone.style.visibility = "visible";

    const duration = 350;

    const animation = this.fromClone.animate([fromTransform, toTransform], { duration: duration });

    animation.onfinish = () => {
      document.querySelector("#morph-holder").removeChild(this.fromClone);
    };
    document.querySelector("#morph-holder").appendChild(this.fromClone);

    this.fromAnimation = animation;
  }
}
