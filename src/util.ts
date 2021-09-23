/**
 * Create by Capricorncd
 * Sat Oct 21 2017 18:49:07 GMT+0800
 * https://github.com/capricorncd
 */
import * as Types from '../types'

const util = {
  // 获取DOM元素
  q (selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement
  },
  // 事件监听(浏览器兼容处理)
  eventListener(el: HTMLElement | Document, type: string, handle: (...args: any[]) => void): void {
    if (!el) {
      console.error('The this.eventListener() DOM node is undefined')
      return
    }
    el.addEventListener(type, handle, false)
  },
  // IE浏览器
  isIEBrower: navigator.appName === 'Microsoft Internet Explorer',
  // IE浏览器版本
  ieBrowerVersion(): number {
    if (/MSIE (\d+)/ig.test(navigator.userAgent)) {
      return +RegExp.$1
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
  rand(max = 1): number {
    return Math.ceil(Math.random() * max)
  },
  // 格式化时间
  // formatTime
  ft(sec: number): string {
    const str = util.fd(Math.floor(sec / 60)) + ':' + util.fd(sec % 60)
    if (sec > 3600) {
      return util.fd(Math.floor(sec / 3600)) + ':' + str
    } else {
      return str
    }
  },

  // 格式化一位数字
  // formatDigit
  fd (num: number): string {
    return num < 10 ? '0' + num : num + ''
  },

  // 检查移动的点，在舞台上是否合法
  checkPoint (pos: Types.SquareOrigin, x: number, y: number, data: Types.NumberArray[]): boolean {
    return !((
      pos.x + x < 0 ||
      pos.x + x >= data.length ||
      pos.y + y < 0 ||
      pos.y + y >= data[0].length ||
      data[pos.x + x][pos.y + y] === 1
    ))
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

const SCORE_CACHE_KEY = 'maxScoreInfo'

export function getMaxScore(): {score: number; date: number} | null {
  try {
    const cache = localStorage.getItem(SCORE_CACHE_KEY)
    if (cache) {
      return JSON.parse(cache)
    }
  } catch (e) {
    // console.log(e);
  }
  return null
}

export function setMaxScore(score: number): void {
  const cache = getMaxScore() || { score: 0, date: 0 }
  if (cache.score >= score) return
  const data = {
    score,
    date: +new Date()
  }
  localStorage.setItem(SCORE_CACHE_KEY, JSON.stringify(data))
}
