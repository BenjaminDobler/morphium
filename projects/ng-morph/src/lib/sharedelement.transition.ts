import { getBox } from "./util";

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

  async prepare(from, to) {
    console.log("Shared Element transition ");

    const fromContainer: any = document.createElement("div");
    const toContainer: any = document.createElement("div");

    //document.querySelector("body").appendChild(fromContainer);
    //document.querySelector("body").appendChild(toContainer);

    this.fromClone = from.cloneNode(true);
    this.toClone = to.cloneNode(true);

    const options = from.getAttribute("hero-options");
    console.log("Options 1", options);

    let optionsObj: any = {};

    if (options) {
      const optionsA = options.split(";").forEach(o => {
        const valuePair = o.split(":");
        optionsObj[valuePair[0]] = valuePair[1];
      });
      console.log("OptionsA ", optionsA);
    }
    console.log("Options ", optionsObj);

    const delay = optionsObj.delay || 0;

    this.fromClone.setAttribute("style", window.getComputedStyle(from).cssText);
    this.toClone.setAttribute("style", window.getComputedStyle(to).cssText);
    this.fromClone.style.marginLeft = "0";
    this.fromClone.style.marginTop = "0";
    this.fromClone.style.left = 0;
    this.fromClone.style.right = 0;
    this.fromClone.style.top = 0;

    this.toClone.style.left = 0;
    this.toClone.style.right = 0;
    this.toClone.style.top = 0;

    const fromRect: any = getBox(from, { getMargins: false });
    const toRect: any = getBox(to, { getMargins: false });

    //const fromStyles = getComputedStyle(from);
    //const toStyles = getComputedStyle(to);

    fromContainer.style.position = "absolute";
    fromContainer.style.top = fromRect.top + "px";
    fromContainer.style.left = fromRect.left + "px";
    fromContainer.style.width = fromRect.width + "px";
    fromContainer.style.height = fromRect.height + "px";
    fromContainer.style.visibility = "visible";
    fromContainer.style.opacity = "1";
    fromContainer.style.transformOrigin = "left top 0px";
    fromContainer.style.willChange = "transform, opacity";
    fromContainer.style.transform = "translate3d(0, 0, 0)";

    toContainer.style.position = "absolute";
    toContainer.style.top = toRect.top + "px";
    toContainer.style.left = toRect.left + "px";
    toContainer.style.width = toRect.width + "px";
    toContainer.style.height = toRect.height + "px";
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
      { duration: duration, delay: delay }
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
      { duration: duration, delay: delay }
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
