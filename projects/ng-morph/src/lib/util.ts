export const getBox = (elm, {getMargins = false} = {}) => {
  const box = elm.getBoundingClientRect();
  const styles = getComputedStyle(elm);

  return {
    top: box.top + window.scrollY - (getMargins ? parseInt(styles.marginTop, 10) : 0),
    left: box.left + window.scrollX - (getMargins ? parseInt(styles.marginLeft, 10) : 0),
    width: box.width + (getMargins ? parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10) : 0),
    height: box.height + (getMargins ? parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10) : 0)
  };
};

export const applyBox = (box: any, el) => {
  el.style.position = 'absolute';
  el.style.top = box.top + 'px';
  el.style.left = box.left + 'px';
  el.style.width = box.width + 'px';
  el.style.height = box.height + 'px';
};

export const parseOptions = options => {
  const optionsObj: any = {};
  if (options) {
    const optionsA = options.split(';').forEach(o => {
      const valuePair = o.split(':');
      optionsObj[valuePair[0]] = valuePair[1];
    });
  }
  return optionsObj;
};

export const resetPosition = el => {
  el.style.left = 0;
  el.style.right = 0;
  el.style.top = 0;
};

export async function wait(t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  });
}



export function getMatrix(el) {
  const st = window.getComputedStyle(el, null);

  const tr = st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform') ||
    'FAIL';
  return tr;
}

export function getRotation(el) {
  const st = window.getComputedStyle(el, null);
  const tr = st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform') ||
    'FAIL';

  if (tr === 'FAIL' || tr === 'none') {
    return 0;
  }

// With rotate(30deg)...
// matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
  console.log('Matrix: ' + tr);

// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

  const values = tr.split('(')[1].split(')')[0].split(',');
  const a:any = values[0];
  const b:any = values[1];
  const c:any = values[2];
  const d:any = values[3];

  const scale: any = Math.sqrt(a * a + b * b);

  // console.log('Scale: ' + scale);

// arc sin, convert from radians to degrees, round
  const sin = b / scale;
// next line works for 30deg but not 130deg (returns 50);
// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
  const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
  return angle;
}
