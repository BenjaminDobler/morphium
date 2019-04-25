import { getBox, applyBox } from "./util";

async function wait(t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export class HeroAnimation {
  fromClone: any;

  fromAnimation: any;

  constructor(from: any) {
    this.fromClone = from.cloneNode(true);
    const fromRect: any = getBox(from, { getMargins: false });
    applyBox(fromRect, this.fromClone);
    this.fromClone.style.visibility = "visible";

    const duration = 350;

    const animation = this.fromClone.animate(
      [
        {
          opacity: 1
        },
        {
          opacity: 0
        }
      ],
      { duration: duration }
    );

    animation.onfinish = () => {
      document.querySelector("#morph-holder").removeChild(this.fromClone);
    };
    document.querySelector("#morph-holder").appendChild(this.fromClone);

    this.fromAnimation = animation;
  }
}
