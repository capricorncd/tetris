/**
 * Create by Capricorncd
 * Sat Oct 21 2017 18:49:07 GMT+0800
 */

/**
 * ***************************************************
 * CAPR
 * ***************************************************
 */
const CAPR: any = {
  // 获取DOM元素
  q: (selector: string) => {
    if (document.querySelector) {
      return document.querySelector(selector)
    }
    else if (window.$) {
      return window.$(selector)[0]
    }
    else {
      return null
    }
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
      console.error('The CAPR.eventListener() DOM node is undefined')
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
  isAndroid: !!navigator.userAgent.match(/android/ig),
  isIos: !!navigator.userAgent.match(/(iphone|ipod|ios|ipad)/ig),
  isMobile: !!navigator.userAgent.match(/(android|iphone|ipod|ios|ipad)/ig),
  isWin: navigator.platform == "Win32" || navigator.platform == "Windows",
  isMac: navigator.platform == "Mac68K" || navigator.platform == "MacPPC" || navigator.platform == "Macintosh" || navigator.platform == "MacIntel",
  // 生成随机整数
  rand: (max: number = 1) => {
    return Math.ceil(Math.random() * max)
  },
  // 格式化时间
  // formatTime
  ft: (sec: number) => {
    var str = CAPR.fd(Math.floor(sec/60)) + ':' + CAPR.fd(sec % 60)
    if (sec > 3600) {
      return CAPR.fd(Math.floor(sec/3600)) + ':' + str
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
    // return (
    //   pos.x + x < 0
    //   || pos.x + x >= data.length
    //   || pos.y + y < 0
    //   || pos.y + y >= data[0].length
    //   || data[pos.x + x][pos.y + y] === 1
    // ) ? false : true
    if (pos.x + x < 0) {
      return false
    } else if (pos.x + x >= data.length) {
      return false
    } else if (pos.y + y < 0) {
      return false
    } else if (pos.y + y >= data[0].length) {
      return false
    } else if (data[pos.x + x][pos.y + y] === 1) {
      return false
    }
    return true
  }
}

/**
 * ***************************************************
 * Squate
 * ***************************************************
 */
class Square {
  // 方块矩阵
  data: any = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  // 各种形状方块(组)
  SQUARES: any = {
    // 方块01
    1: [
      [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
      ],
      [
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ],
    // 方块02
    2: [
      [
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 2, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ],
    // 方块03
    3: [
      [
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 2, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 2, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ],
    // 方块04
    4: [
      [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 0, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0],
        [2, 0, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 2, 0],
        [0, 0, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ],
    // 方块05
    5: [
      [
        [2, 0, 0, 0],
        [2, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 2, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 2, 0, 0],
        [2, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ],
    // 方块06
    6: [
      [
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0],
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ],
    7: [
      [
        [0, 2, 0, 0],
        [2, 2, 0, 0],
        [2, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [2, 2, 0, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ]
  }

  // 原点
  origin: any = {
    x: 0,
    y: 0
  }
  // 随机方向
  // direction 英 [dəˈrekʃn] 美 [dɪˈrɛkʃən, daɪ-]
  dir: number = 0
  // 方块索引 index
  // index: number
  // 当前方块
  rotates: any
  constructor (index: number = 1) {
    this.rotates = this.SQUARES[index]
  }

  // 检查数据是否合法
  isValid (pos: any, data: any, stageArray: any) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!CAPR.checkPoint(pos, i, j, stageArray)) {
            return false
          }
        }
      }
    }
    return true
  }

  // 是否能旋转
  canRotate (stageArray: any) {
    let len: number = this.rotates.length
    let index: number = (this.dir + 1) % len
    let test: any = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[0].length; j++) {
        test[i][j] = this.rotates[index][i][j]
      }
    }
    return this.isValid(this.origin, test, stageArray)
  }

  rotate (num: number = 1) {
    let i: number, j: number
    this.dir = (this.dir + num) % this.rotates.length
    for (i = 0; i < this.data.length; i++) {
      for (j = 0; j < this.data[0].length; j++) {
        this.data[i][j] = this.rotates[this.dir][i][j]
      }
    }
  }

  // 是否能下降
  canDown (stageArray: any) {
    let test: any = {}
    test.x = this.origin.x + 1
    test.y = this.origin.y
    return this.isValid(test, this.data, stageArray)
  }

  down () {
    this.origin.x += 1
  }

  // 是否能左移
  canLeft (stageArray: any) {
    let test: any = {}
    test.x = this.origin.x
    test.y = this.origin.y - 1
    return this.isValid(test, this.data, stageArray)
  }
  left () {
    this.origin.y -= 1
  }

  // 是否能右移
  canRight (stageArray: any) {
    let test: any = {}
    test.x = this.origin.x
    test.y = this.origin.y + 1
    return this.isValid(test, this.data, stageArray)
  }
  right () {
    this.origin.y += 1
  }

  // 是否能上移
  canUp (stageArray: any) {
    let test: any = {}
    test.x = this.origin.x - 1
    test.y = this.origin.y
    return this.isValid(test, this.data, stageArray)
  }
  up () {
    this.origin.x -= 1
  }

}

/**
 * ***************************************************
 * Tetris
 * ***************************************************
 */
// 消息码及提示
const CODES: any = {
  0: 'Tetris readied',
  1: '浏览器版本过低，请升级浏览器',
  2: '创建Tetris DOM失败，请升级浏览器或引入jQuery/Zepte库'
}

// Tetris
class Tetris {

  // 方块下落时间间隔
  INTERVAL: number = 500
  // 下落速度定时器
  moveTimer: any
  // 游戏定时器
  gameTimer: any
  // 游戏时间，单位秒
  gameTimes: number = 0
  // 游戏是否结束
  isGameOver: boolean = false
  // 是否暂停
  isPause: boolean = false
  // 游戏计分
  gameScores: number = 0
  // 游戏舞台二维矩阵
  stageArray: any = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  // 当前方块 currentSquare
  currSquare: any
  // 下一个方块
  nextSquare: any
  // 舞台方块数据divs
  stageDivs: any = []
  // 下一个方块组数据
  nextDivs: any = []

  // 默认配置参数
  opts: any = {
    // 游戏容器，默认为body
    container: 'body',
    ready: (res: any) => {},
    error: (err: any) => {}
  }

  // 游戏外部DOM容器(父容器)
  outerDom: any = null
  // 游戏容器
  dom: any = null
  // DOM id
  domId: string = `Tetris_${new Date().getTime()}`

  // constructor
  constructor (opts: any) {
    this.opts = CAPR.extend(opts, this.opts)
    this.outerDom = CAPR.q(this.opts.container)
    this.init()
  }

  // 创建游戏DOM
  createGameDom (callback: any) {
    this.dom = document.createElement('div')
    this.dom.className = 'capricorncd-tetris-container'
    this.dom.id = this.domId
    this.dom.innerHTML = `
      <div class="tetris-stage"></div>
      <div class="tetris-sider-wrapper">
        <div class="next-square"></div>
        <div class="tetris-statistics">
          <div class="game-times">
            <span class="times">00:00</span>
          </div>
          <div class="game-scores">
            <span class="score">0</span>
          </div>
        </div>
        <div class="control-wrapper">
          <button class="tetris-setup">Setup</button>
          <button class="tetris-restart">Restart</button>
          <button class="tetris-pause">Pause</button>
        </div>
      </div>
    
      <div class="tetris-control-wrapper">
        <div class="grid-wrapper">
          <div class="grid"></div>
          <div class="grid">
            <button class="btn-rotate">Rotate</button>
          </div>
          <div class="grid"></div>
        </div>
        <div class="grid-wrapper">
          <div class="grid">
            <button class="btn-left">Left</button>
          </div>
          <div class="grid">
            <button class="btn-fall">OK</button>
          </div>
          <div class="grid">
            <button class="btn-right">Right</button>
          </div>
        </div>
        <div class="grid-wrapper">
          <div class="grid"></div>
          <div class="grid">
            <button class="btn-down">Down</button>
          </div>
          <div class="grid"></div>
        </div>
      </div>
    `
    if (this.outerDom) {
      this.outerDom.innerHTML = ''
      this.outerDom.appendChild(this.dom)
      this.opts.ready({code: 0, msg: `${CODES[0]} in '${this.opts.container}'`})
      callback()
    } else {
      this.opts.error({code: 2, msg: CODES[2]})
    }
  }

  // 游戏控制
  gameController () {
    // 绑定键盘事件
    CAPR.eventListener(document, 'keydown', (e: any) => {
      e = e || event
      let code: number = e.keyCode
      // pause
      if (code === 13) {
        if (this.isGameOver) return
        this.pause()
      }

      if (code === 16) {
        this.restart()
      }

      // 游戏已暂停
      if (this.isPause) {
        return
      }
      // up(rotate)旋转方块
      if (code === 38) {
        this.rotate()
      }
      // right
      else if (code === 39) {
        this.right()
      }
      // down
      else if (code === 40) {
        this.down()
      }
      // left
      else if (code === 37) {
        this.left()
      }
      // space
      else if (code === 32) {
        this.fall()
      }
    })

    // 绑定按钮事件
    CAPR.eventListener(CAPR.q(`#${this.domId} .btn-left`), 'click', () => {
      if (this.isPause) return
      this.left()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .btn-right`), 'click', () => {
      if (this.isPause) return
      this.right()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .btn-down`), 'click', () => {
      if (this.isPause) return
      this.down()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .btn-rotate`), 'click', () => {
      if (this.isPause) return
      this.rotate()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .btn-fall`), 'click', () => {
      if (this.isPause) return
      this.fall()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .tetris-pause`), 'click', () => {
      if (this.isGameOver) return
      this.pause()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .tetris-restart`), 'click', () => {
      this.restart()
    })
    CAPR.eventListener(CAPR.q(`#${this.domId} .tetris-setup`), 'click', () => {
      alert('开发中...')
    })
  }

  // 初始化Div
  initDiv (container: any, data: any, divs: any) {
    const ieVer: number = CAPR.ieBrowerVersion()
    for (let i = 0; i < data.length; i++) {
      var arr = []
      for (let j = 0; j < data[0].length; j++) {
        let newNode = document.createElement('div')
        newNode.className = 'none'
        if (CAPR.isIEBrower && ieVer <= 9) {
          newNode.style.top = (i * 20) + 'px'
          newNode.style.left = (j * 20) + 'px'
        } else {
          newNode.style.transform = `translate(${j * 20}px, ${i * 20}px)`
        }
        container.appendChild(newNode)
        arr.push(newNode)
      }
      divs.push(arr)
    }
  }

  // 刷新div
  refreshDiv (data: any = this.stageArray, divs: any = this.stageDivs) {
    for (let i: number = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] === 0) {
          divs[i][j].className = 'none'
        } else if (data[i][j] === 1) {
          divs[i][j].className = 'done'
        } else if (data[i][j] === 2) {
          divs[i][j].className = 'current'
        }
      }
    }
  }

  // 重置方块位置
  resetPos (type: string = 'set') {
    let i: number, j: number, x: number, y: number
    x = this.currSquare.origin.x
    y = this.currSquare.origin.y
    for (i = 0; i < this.currSquare.data.length; i++) {
      for (j = 0; j < this.currSquare.data[0].length; j++) {
        if (CAPR.checkPoint(this.currSquare.origin, i, j, this.stageArray)) {
          // 清除移动后的方块位置
          if ('clear' === type) {
            this.stageArray[x + i][y + j] = 0
          }
          // 设置移动后方块位置
          else if ('set' === type) {
            this.stageArray[x + i][y + j] = this.currSquare.data[i][j]
          }
        }
      }
    }
  }

  // 清除移动后的方块位置
  // clearData () {
  //   let i: number, j: number, x: number, y: number, cur: any = this.currSquare
  //   x = cur.origin.x
  //   y = cur.origin.y
  //   for (i = 0; i < cur.data.length; i++) {
  //     for (j = 0; j < cur.data[0].length; j++) {
  //       if (this._checkPoint(cur.origin, i, j)) {
  //         this.stageArray[x + i][y + j] = 0
  //       }
  //     }
  //   }
  // }

  // 设置移动后方块位置
  // setData () {
  //   let i: number, j: number, x: number, y: number, cur: any = this.currSquare
  //   x = cur.origin.x
  //   y = cur.origin.y
  //   for (i = 0; i < cur.data.length; i++) {
  //     for (j = 0; j < cur.data[0].length; j++) {
  //       if (this._checkPoint(cur.origin, i, j)) {
  //         this.stageArray[x + i][y + j] = cur.data[i][j]
  //       }
  //     }
  //   }
  // }

  // 旋转方块
  rotate () {
    if (this.currSquare.canRotate(this.stageArray)) {
      this.resetPos('clear')
      this.currSquare.rotate()
      this.resetPos('set')
      this.refreshDiv()
    }
  }

  // 左移方块
  left () {
    if (this.currSquare.canLeft(this.stageArray)) {
      this.resetPos('clear')
      this.currSquare.left()
      this.resetPos('set')
      this.refreshDiv()
    }
  }

  // 右移方块
  right () {
    if (this.currSquare.canRight(this.stageArray)) {
      this.resetPos('clear')
      this.currSquare.right()
      this.resetPos('set')
      this.refreshDiv()
    }
  }

  // 下移方块
  down () {
    // 判断是否能继续下降
    if (this.currSquare.canDown(this.stageArray)) {
      this.resetPos('clear')
      this.currSquare.down()
      this.resetPos('set')
      this.refreshDiv()
      return true
    } else {
      return false
    }
  }

  // 落下方块
  fall () {
    while (this.down())
  }

  // 方块移动到底部，固定方块
  fixed () {
    let i: number, j: number
    let data = this.currSquare.data
    // console.log(data)
    for (i = 0; i < data.length; i++) {
      for (j = 0; j < data[0].length; j++) {
        if (CAPR.checkPoint(this.currSquare.origin, i, j, this.stageArray)) {
          if (this.stageArray[this.currSquare.origin.x + i][this.currSquare.origin.y + j] == 2) {
            this.stageArray[this.currSquare.origin.x + i][this.currSquare.origin.y + j] = 1
          }
        }
      }
    }
    this.refreshDiv()
  }

  // 检查游戏结束
  checkGameOver () {
    let isOver: boolean = false
    for (let i = 0; i < this.stageArray[0].length; i++) {
      if (this.stageArray[0][i] == 1) {
        isOver = true
        break
      }
    }
    return isOver
  }

  // 使用下一个方块
  performNext (type: number, dir: number) {
    this.currSquare = this.nextSquare
    this.resetPos('set')
    this.nextSquare = this.make(type, dir)
    this.refreshDiv()
    this.refreshDiv(this.nextSquare.data, this.nextDivs)
  }

  // 清除填满方块的整行
  checkClear () {
    let i: number, j: number, m: number, n: number, line: number = 0, len: number = this.stageArray.length
    for (i = len - 1; i >= 0; i--) {
      let isClear: boolean = true
      for (j = 0; j < this.stageArray[0].length; j++) {
        if (this.stageArray[i][j] != 1) {
          isClear = false
          break
        }
      }
      if (isClear) {
        line += 1
        // 整体下移
        for (m = i; m > 0; m--) {
          for (n = 0; n < this.stageArray[0].length; n++) {
            this.stageArray[m][n] = this.stageArray[m-1][n]
          }
        }
        for (n = 0; n < this.stageArray[0].length; n++) {
          this.stageArray[0][n] = 0
        }
        i++
      }
    }
    return line
  }

  // 底部增加行
  addTailLines (lines: any) {
    let i: number, j: number
    let alen: number = this.stageArray.length
    let llen: number = lines.length
    for (i = 0; i < alen - llen; i++) {
      this.stageArray[i] = this.stageArray[i + llen]
    }
    for (j = 0; j < llen; j++) {
      this.stageArray[alen - llen + j] = lines[j]
    }
    this.currSquare.origin.x -= llen
    if (this.currSquare.origin.x < 0) {
      this.currSquare.origin.x = 0
    }
    this.refreshDiv()
  }

  // 创建方块(组)
  make (index: number = 1, dir: number) {
    let s: Square = new Square(index)
    // switch (index) {
    //   case 1:
    //     s = new Square1()
    //     break
    //   case 2:
    //     s = new Square2()
    //     break
    //   case 3:
    //     s = new Square3()
    //     break
    //   case 4:
    //     s = new Square4()
    //     break
    //   case 5:
    //     s = new Square5()
    //     break
    //   case 6:
    //     s = new Square6()
    //     break
    //   default:
    //     s = new Square7()
    // }
    s.origin.x = 0
    s.origin.y = 3
    s.rotate(dir)
    return s
  }

  /**
   * *******************************************************
   * 游戏操作
   * *******************************************************
   */
  // 下落
  move () {
    if (!this.down()) {
      this.fixed()
      let line: number = this.checkClear()
      this.addScore(line)
      if (this.checkGameOver()) {
        this.stop()
      } else {
        this.performNext(CAPR.rand(7), CAPR.rand(4))
      }
    }
  }

  // 开始游戏
  // start () {
  //   if (this.isGameOver) {
  //     return
  //   }
  //   if (this.moveTimer) {
  //     clearInterval(this.moveTimer)
  //     this.moveTimer = null
  //   }
  //   if (this.gameTimer) {
  //     clearInterval(this.gameTimer)
  //     this.gameTimer = null
  //   }
  //   this.isPause = false
  //   // 游戏计时
  //   this.gameTimeMeter(0)
  //   this.INTERVAL = 500
  //   this.gameTimes = 0
  //   this.gameScores = 0
  //
  //   // 下一个方块
  //   this.performNext(CAPR.rand(7), CAPR.rand(4))
  //   this.moveTimer = setInterval(() => {
  //     this.move()
  //   }, this.INTERVAL)
  //   CAPR.q(`#${this.domId} .tetris-pause`).innerText = 'Pause'
  // }

  // 暂停游戏
  pause () {
    if (this.isGameOver) return
    if (this.isPause) {
      this.isPause = false
      this.moveTimer = setInterval(() => {
        this.move()
      }, this.INTERVAL)
      this.gameTimeMeter(this.gameTimes)
      CAPR.q(`#${this.domId} .tetris-pause`).innerText = 'Pause'
      // console.log('开始')
    } else {
      this.isPause = true
      if (this.moveTimer) {
        clearInterval(this.moveTimer)
        this.moveTimer = null
      }
      if (this.gameTimer) {
        clearInterval(this.gameTimer)
        this.gameTimer = null
      }
      CAPR.q(`#${this.domId} .tetris-pause`).innerText = 'Start'
      // console.log('暂停')
    }
  }

  // 重新开始游戏
  restart () {

    if (this.moveTimer) {
      clearInterval(this.moveTimer)
      this.moveTimer = null
    }
    if (this.gameTimer) {
      clearInterval(this.gameTimer)
      this.gameTimer = null
    }

    for (let i = 0; i < this.stageArray.length; i++) {
      for (let j = 0; j < this.stageArray[0].length; j++) {
        this.stageArray[i][j] = 0
      }
    }

    // 初始化舞台方块
    this.nextSquare = this.make(CAPR.rand(7), CAPR.rand(4))
    this.refreshDiv()
    this.refreshDiv(this.nextSquare.data, this.nextDivs)

    this.isGameOver = false
    this.isPause = false
    // 游戏计时
    this.gameTimeMeter(0)
    this.INTERVAL = 500
    this.gameTimes = 0
    this.gameScores = 0

    // 下一个方块
    this.performNext(CAPR.rand(7), CAPR.rand(4))
    this.moveTimer = setInterval(() => {
      this.move()
    }, this.INTERVAL)
    CAPR.q(`#${this.domId} .tetris-pause`).innerText = 'Pause'
    CAPR.q(`#${this.domId}`).className = 'capricorncd-tetris-container'
  }

  // gameOver
  stop () {
    this.isGameOver = true
    if (this.moveTimer) {
      clearInterval(this.moveTimer)
      this.moveTimer = null
    }
    CAPR.q(`#${this.domId}`).className = 'capricorncd-tetris-container game-over'
  }

  // 游戏进行时间，单位秒
  gameTimeMeter (initCount: number = 0) {
    this.gameTimer = setInterval(() => {
      this.gameTimes++
      CAPR.q(`#${this.domId} .times`).innerText = CAPR.ft(this.gameTimes)
      if (this.isGameOver) {
        clearInterval(this.gameTimer)
      }
      // 生成干扰行
      // if (this.gameTimes % 10 === 0) {
      //   this.addTailLines(CAPR.rand(1))
      // }
    }, 1000)
  }

  // 游戏分数统计
  addScore (line: number) {
    let s = 0
    switch (line) {
      case 1:
        s = 10
        break
      case 2:
        s = 30
        break
      case 3:
        s = 60
        break
      case 4:
        s = 100
        break
    }
    this.gameScores += s
    CAPR.q(`#${this.domId} .score`).innerText = this.gameScores
    // 下落时间间隔
    this.setDownInterval(this.gameScores)
  }

  // 设置下落时间间隔/速度控制
  setDownInterval (score: number) {
    if (score > 4000) {
      this.INTERVAL = 100
    }  else if (score > 3500) {
      this.INTERVAL = 150
    } else if (score > 3000) {
      this.INTERVAL = 200
    } else if (score > 2500) {
      this.INTERVAL = 250
    } else if (score > 2000) {
      this.INTERVAL = 300
    } else if (score > 1500) {
      this.INTERVAL = 350
    } else if (score > 1000) {
      this.INTERVAL = 400
    } else if (score > 500) {
      this.INTERVAL = 450
    }
  }


  // 初始化游戏
  init () {
    // 创建游戏DOM
    this.createGameDom(() => {
      this.nextSquare = this.make(CAPR.rand(7), CAPR.rand(4))
      // 初始化舞台方块
      this.initDiv(CAPR.q(`#${this.domId} .tetris-stage`), this.stageArray, this.stageDivs)
      this.initDiv(CAPR.q(`#${this.domId} .next-square`), this.nextSquare.data, this.nextDivs)
      this.refreshDiv(this.nextSquare.data, this.nextDivs)
      this.gameController()

      // 下一个方块
      this.performNext(CAPR.rand(7), CAPR.rand(4))
      this.moveTimer = setInterval(() => {
        this.move()
      }, this.INTERVAL)

      // IE浏览器移除底部控制按钮
      if (CAPR.isIEBrower && CAPR.ieBrowerVersion() < 10) {
        let body: any = CAPR.q('body')
        let bodyClassName: string = body.className || ''
        if (bodyClassName.indexOf('ie-brower') === -1) {
          body.className = 'ie-brower ' + bodyClassName
        }
      }
    })
  }

}
