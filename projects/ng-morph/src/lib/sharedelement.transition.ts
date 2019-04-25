import { getBox, parseOptions, applyBox, resetPosition } from "./util";

async function wait(t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}

export class SharedElementTransition {
  fromClone: any;
  toClone: any;

  fromAnimation: any;
  toAnimation: any;

  constructor(from: any, to: any) {
    this.prepare(from, to);
  }

  async prepare(fromHero, toHero) {
    console.log("Shared Element transition ");

    const from = fromHero.node;
    const to = toHero.node;

    const fromContainer: any = document.createElement("div");
    const toContainer: any = document.createElement("div");

    this.fromClone = from.cloneNode(true);
    this.toClone = to.cloneNode(true);

    const options = fromHero.options; // {}; // parseOptions(from);

    this.fromClone.setAttribute("style", window.getComputedStyle(from).cssText);
    this.toClone.setAttribute("style", window.getComputedStyle(to).cssText);
    this.fromClone.style.marginLeft = "0";
    this.fromClone.style.marginTop = "0";

    resetPosition(this.fromClone);
    resetPosition(this.toClone);

    const fromRect: any = getBox(from, { getMargins: false });
    const toRect: any = getBox(to, { getMargins: false });

    //const fromStyles = getComputedStyle(from);
    //const toStyles = getComputedStyle(to);

    applyBox(fromRect, fromContainer);

    fromContainer.style.visibility = "visible";
    fromContainer.style.opacity = "1";
    fromContainer.style.transformOrigin = "left top 0px";
    fromContainer.style.willChange = "transform, opacity";
    fromContainer.style.transform = "translate3d(0, 0, 0)";

    applyBox(toRect, toContainer);

    toContainer.style.visibility = "visible";
    toContainer.style.opacity = "0";
    toContainer.style.transformOrigin = "left top 0px";
    toContainer.style.willChange = "transform, opacity";
    toContainer.style.transform = "translate3d(" + (fromRect.left - toRect.left) + "px, " + (fromRect.top - toRect.top) + "px, 0)";

    fromContainer.append(this.fromClone);
    toContainer.append(this.toClone);

    from.style.visibility = "hidden";
    to.style.visibility = "hidden";

    const duration = 350;

    const transform: string = "translate3d(" + (toRect.left - fromRect.left) + "px, " + (toRect.top - fromRect.top) + "px, 0)";
    const animation = fromContainer.animate(
      [
        {
          transform: `translate3d(0, 0, 0)`,
          opacity: 1
        },
        {
          transform: transform + ` scale(${toRect.width / fromRect.width}, ${toRect.height / fromRect.height})`,
          opacity: 0
        }
      ],
      { duration: parseInt(options.duration, 10) || 350, delay: options.delay || 0, easing: options.easing || "ease-in" }
    );
    //animation.pause();

    const transformTo: string = "translate3d(" + (fromRect.left - toRect.left) + "px, " + (fromRect.top - toRect.top) + "px, 0)";

    const animationTo = toContainer.animate(
      [
        {
          transform: transformTo + ` scale(${fromRect.width / toRect.width}, ${fromRect.height / toRect.height})`,
          opacity: 0
        },
        {
          transform: `translate3d(0, 0, 0) scale(1,1)`,
          opacity: 1
        }
      ],
      { duration: parseInt(options.duration, 10) || 350, delay: options.delay || 0, easing: options.easing || "ease-in" }

      // { duration: parseInt(options.duration, 10) || 350, delay: options.delay || 0, easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)" }
    );

    //from.style.visibility = "hidden";
    //animationTo.pause();

    /*
    setTimeout(()=>{
      animation.play();
      animationTo.play();
    }, 100);
    */

    animation.onfinish = () => {
      to.style.visibility = "visible";
      document.querySelector("#morph-holder").removeChild(fromContainer);
      document.querySelector("#morph-holder").removeChild(toContainer);
    };
    document.querySelector("#morph-holder").appendChild(fromContainer);
    document.querySelector("#morph-holder").appendChild(toContainer);

    this.fromAnimation = animation;
    this.toAnimation = animationTo;
  }

  getDepth(el: Node) {
    let count = 0;
    while (el.parentNode) {
      count++;
      el = el.parentNode;
    }
    return count;
  }
}
