export default function transform (elem, el, attr, val) {
  if (!el.transform) {
    el.transform = {};
  }
  // console.log(el);
  if (arguments.length > 3) {
    el.transform[attr] = val;
    let sVal = '';
    for (let s in el.transform) {
      switch (s) {
        case 'translate3d':
          let valArr = el.transform[s].split(',');
          let setVal = '';
          for (let i = 0; i < valArr.length; i++) {
            if (i === valArr.length - 1) {
              setVal += valArr[i] + 'px';
            } else {
              setVal += valArr[i] + 'px,';
            }
          }
          sVal += s + '(' + setVal + ')';
          break;
      }
      elem.style.WebkitTransform = elem.style.transform = sVal;
    }
  } else {
    // console.log(el.transform[attr]);
    // val = el.transform[attr];
    if (el.transform[attr]) {
      if (attr === 'translate3d') {
        let valArr = el.transform[attr].split(',');
        console.log(valArr);
        val = {
          X: parseFloat(valArr[0]),
          Y: parseFloat(valArr[1]),
          Z: parseFloat(valArr[2])
        };
      } else {
        val = el.transform[attr];
      }
    }

    return val;
  }
}
