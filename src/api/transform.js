export default function transform (elem, obj, attr, val) {
  if (!obj.transform) {
    obj.transform = {};
  }
  if (arguments.length > 3) {
    obj.transform[attr] = val;
    let sVal = '';
    for (let s in obj.transform) {
      switch (s) {
        case 'translate3d':
          let valArr = obj.transform[s].split(',');
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
      console.log(sVal);
      elem.style.WebkitTransform = elem.style.transform = sVal;
    }
  } else {
    if (obj.transform[attr]) {
      if (attr === 'translate3d') {
        let valArr = obj.transform[attr].split(',');
        val = {
          X: parseFloat(valArr[0]),
          Y: parseFloat(valArr[1]),
          Z: parseFloat(valArr[2])
        };
      } else {
        val = obj.transform[attr];
      }
    }
    return val;
  }
}
