/**
 * Create by zx1984
 * Sat Oct 21 2017 18:49:07 GMT+0800
 * https://github.com/zx1984
 */
const util: any = {
  // 获取DOM元素
  q: (selector: string) => {
    return document.querySelector(selector)
  },
  // 对象继承
  extend: (OPTS: any, DEF: any) => {
    let obj: any = {}
    for (let key in DEF) {
      if (OPTS[key] && typeof OPTS[key] === typeof DEF[key]) {
        obj[key] = OPTS[key]
      } else {
        obj[key] = DEF[key]
      }
    }
    return obj
  },
  // 事件监听(浏览器兼容处理)
  eventListener: (el: any, type: string, handle: any) => {
    if (!el) {
      console.error('The this.eventListener() DOM node is undefined')
      return
    }
    // DOM 2级事件
    if (el.addEventListener) {
      el.addEventListener(type, handle, false)
    }
    // IE浏览器
    else if (el.attachEvent) {
      el.attachEvent('on' + type, handle)
    }
    // DOM 0级事件
    else {
      el['on' + type] = handle
    }
  },
  // IE浏览器
  isIEBrower: navigator.appName === 'Microsoft Internet Explorer',
  // IE浏览器版本
  ieBrowerVersion: () => {
    if (/MSIE (\d+)/ig.test(navigator.userAgent)) {
      return RegExp.$1
    } else {
      return 0
    }
  },
  // isAndroid: !!navigator.userAgent.match(/android/ig),
  // isIos: !!navigator.userAgent.match(/(iphone|ipod|ios|ipad)/ig),
  // isMobile: !!navigator.userAgent.match(/(android|iphone|ipod|ios|ipad)/ig),
  // isWin: navigator.platform == "Win32" || navigator.platform == "Windows",
  // isMac: navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel",
  // 生成随机整数
  rand: (max: number = 1) => {
    return Math.ceil(Math.random() * max)
  },
  // 格式化时间
  // formatTime
  ft: (sec: number) => {
    let str = util.fd(Math.floor(sec/60)) + ':' + util.fd(sec % 60)
    if (sec > 3600) {
      return util.fd(Math.floor(sec/3600)) + ':' + str
    } else {
      return str
    }
  },

  // 格式化一位数字
  // formatDigit
  fd: (num: number) => {
    return num < 10 ? '0' + num : num
  },

  // 检查移动的点，在舞台上是否合法
  checkPoint: (pos: any, x: number, y: number, data: any) => {
    return (
      pos.x + x < 0
      || pos.x + x >= data.length
      || pos.y + y < 0
      || pos.y + y >= data[0].length
      || data[pos.x + x][pos.y + y] === 1
    ) ? false : true
    // if (pos.x + x < 0) {
    //   return false
    // } else if (pos.x + x >= data.length) {
    //   return false
    // } else if (pos.y + y < 0) {
    //   return false
    // } else if (pos.y + y >= data[0].length) {
    //   return false
    // } else if (data[pos.x + x][pos.y + y] === 1) {
    //   return false
    // }
    // return true
  }
}

export default util
