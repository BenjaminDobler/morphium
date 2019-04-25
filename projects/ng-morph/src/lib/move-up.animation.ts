import { getBox, applyBox } from "./util";

async function wait(t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export class MoveUpAnimation {
  fromClone: any;

  fromAnimation: any;

  constructor(from: any) {
    from.style.visibility = "hidden";

    this.fromClone = from.cloneNode(true);
    const fromRect: any = getBox(from, { getMargins: false });
    applyBox(fromRect, this.fromClone);
    this.fromClone.style.visibility = "visible";
    this.fromClone.style.zIndex = -2;

    console.log("MOVE UP ", this.fromClone);

    const duration = 350;

    const animation = this.fromClone.animate(
      [
        {
          transform: "translateY(0)"
        },
        {
          transform: "translateY(-100%)"
        }
      ],
      { duration: duration, easing: "ease-in" }
    );

    animation.onfinish = () => {
      document.querySelector("#morph-holder").removeChild(this.fromClone);
      from.style.visibility = "visible";
    };
    document.querySelector("#morph-holder").appendChild(this.fromClone);

    this.fromAnimation = animation;
  }
}
