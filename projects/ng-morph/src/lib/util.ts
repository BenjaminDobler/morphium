export const getBox = (elm, { getMargins = false } = {}) => {
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
  el.style.position = "absolute";
  el.style.top = box.top + "px";
  el.style.left = box.left + "px";
  el.style.width = box.width + "px";
  el.style.height = box.height + "px";
};
