/* 共通ライブラリー
auth: Antony Han 2019/9/23 */
(function() {
  let numPro = Number.prototype;
  numPro.myToFixed = function(s) {
    let times = Math.pow(10, s);
    let des = this * times + 0.5;
    des = parseInt(des, 10) / times;
    return des + '';
  };
  let aryPro = Array.prototype;
  aryPro.myDistinct = function() {
    let obj = {};
    for (let i = 0; i < this.length; i++) {
      let cur = this[i];
      if (obj[cur] === cur) {
        this[i] = this[this.length - 1];
        this.length -= 1;
        i--;
        continue;
      }
      obj[cur] = cur;
    }
    obj = null;
  };
  aryPro.myForEach = function(fn, context) {
    context = context || window;
    if (Array.prototype.forEach) {
      this.forEach(fn, context);
    } else {
      for (let i = 0; i < this.length; i++) {
        fn.apply(context, [this[i], i, this]);
      }
    }
  };
  let strPro = String.prototype;
  strPro.myTrim = function() {
    return this.replace(/(^\s*|\s*$)/g, '');
  };
  strPro.mySub = function() {
    let len = arguments[0] || 10,
      isD = arguments[1] || false,
      str = '',
      n = 0;
    for (let i = 0; i < this.length; i++) {
      let s = this.charAt(i);
      /[\u4e00-\u9fa5]/.test(s) ? (n += 2) : n++;
      if (n > len) {
        isD ? (str += '...') : void 0;
        break;
      }
      str += s;
    }
    return str;
  };
  strPro.myQueryURLParameter = function() {
    let reg = /([^?&=]+)=([^?&=]+)/g,
      obj = {};
    this.replace(reg, function() {
      obj[arguments[1]] = arguments[2];
    });
    return obj;
  };
})();

export const verifyType = () => {
  let verifyType = {};
  var numObj = {
      isNum: 'Number',
      isStr: 'String',
      isBoo: 'Boolean',
      isNull: 'Null',
      isUnd: 'Undefined',
      isObj: 'Object',
      isAry: 'Array',
      isFun: 'Function',
      isReg: 'RegExp',
      isSymbol: 'symbol',
      isJson: 'json',
      isMath: 'math'
    },
    isType = function() {
      let outerArg = arguments[0];
      return function() {
        var innerArg = arguments[0],
          reg = new RegExp('^\\[object ' + outerArg + '\\]$', 'i');
        return reg.test(Object.prototype.toString.call(innerArg));
      };
    };
  for (let key in numObj) {
    verifyType[key] = isType(numObj[key]);
  }
  return verifyType;
};
export const Observer = (function() {
  let __msg = {};
  return {
    on: function(eType, handler) {
      !(eType in __msg)
        ? (__msg[eType] = [handler])
        : __msg[eType].push(handler);
    },
    run: function(eType, args) {
      if (!__msg[eType]) return;
      let i = 0,
        len = __msg[eType].length;
      for (; i < len; i++) __msg[eType][i].call(this, args);
    },
    off: function(eType, handler) {
      if (__msg[eType] instanceof Array) {
        let i = __msg[eType].length - 1;
        for (; i >= 0; i--)
          __msg[eType][i] === handler && __msg[eType].splice(i, 1);
      }
    }
  };
})();
