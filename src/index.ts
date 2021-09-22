/**
 * Create by Capricorncd
 * Sat Oct 21 2017 18:49:07 GMT+0800
 * https://github.com/capricorncd
 */
import util from './util'
import Square from './square'
import * as Types from '../types'
import { CODES, DEF_OPTIONS, KEYBOARD_KEYS } from './constants'
import './scss/style.scss'

/**
 * ***************************************************
 * Tetris
 * ***************************************************
 */
class Tetris {
  // 方块下落时间间隔
  private INTERVAL = 500
  // 下落速度定时器
  private moveTimer: number | null = null
  // 游戏定时器
  private gameTimer: number | null = null
  // 游戏时间，单位秒
  private gameTimes = 0
  // 游戏是否结束
  private isGameOver = false
  // 是否暂停
  private isPause = false
  // 游戏计分
  private gameScores = 0
  // 游戏舞台二维矩阵
  private stageArray: Types.NumberArray[] = [
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
  private currSquare: Square | null = null
  // 下一个方块
  private nextSquare: Square | null = null
  // 舞台方块数据divs
  private stageDivs: any = []
  // 下一个方块组数据
  private nextDivs: any = []

  // 游戏外部DOM容器(父容器)
  private outerDom: HTMLElement | null = null
  // 游戏容器
  private dom: HTMLElement | null = null
  // DOM id
  private domId = `Tetris_${new Date().getTime()}`

  private opts: Types.Options

  // constructor
  constructor (opts: Types.Options) {
    this.opts = {
      ...DEF_OPTIONS,
      ...opts
    }
    this.outerDom = util.q(this.opts.container)
    this.init()
  }

  // 创建游戏DOM
  createGameDom (): void {
    this.dom = document.createElement('div')
    this.dom.className = 'zx-tetris-container'
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
<!--          <button class="tetris-setup">Setup</button>-->
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
      this.opts.ready({ code: 0, msg: `${CODES[0]} in '${this.opts.container}'` })
    } else {
      this.opts.error({ code: 2, msg: CODES[2] })
    }
  }

  // 游戏控制
  gameController (): void {
    // 绑定键盘事件
    util.eventListener(document, 'keydown', (e: KeyboardEvent) => {
      e.preventDefault()
      const keyCode = e.keyCode
      const key = e.key
      // pause
      if (key === KEYBOARD_KEYS.ENTER || keyCode === 13) {
        if (this.isGameOver) return
        this.pause()
      }

      // restart
      if (key === KEYBOARD_KEYS.SHIFT || keyCode === 16) {
        this.restart()
      }

      // 游戏已暂停
      if (this.isPause) {
        return
      }
      // up(rotate)旋转方块
      if (key === KEYBOARD_KEYS.ARROW_UP || keyCode === 38) {
        this.rotate()
      }
      // right
      else if (key === KEYBOARD_KEYS.ARROW_RIGHT || keyCode === 39) {
        this.right()
      }
      // down
      else if (key === KEYBOARD_KEYS.ARROW_DOWN || keyCode === 40) {
        this.down()
      }
      // left
      else if (key === KEYBOARD_KEYS.ARROW_LEFT || keyCode === 37) {
        this.left()
      }
      // space(fall)
      else if (key === KEYBOARD_KEYS.SPACE || keyCode === 32) {
        this.fall()
      }
    })

    // 绑定按钮事件
    util.eventListener(util.q(`#${this.domId} .btn-left`), 'click', () => {
      if (this.isPause) return
      this.left()
    })
    util.eventListener(util.q(`#${this.domId} .btn-right`), 'click', () => {
      if (this.isPause) return
      this.right()
    })
    util.eventListener(util.q(`#${this.domId} .btn-down`), 'click', () => {
      if (this.isPause) return
      this.down()
    })
    util.eventListener(util.q(`#${this.domId} .btn-rotate`), 'click', () => {
      if (this.isPause) return
      this.rotate()
    })
    util.eventListener(util.q(`#${this.domId} .btn-fall`), 'click', () => {
      if (this.isPause) return
      this.fall()
    })
    util.eventListener(util.q(`#${this.domId} .tetris-pause`), 'click', () => {
      if (this.isGameOver) return
      this.pause()
    })
    util.eventListener(util.q(`#${this.domId} .tetris-restart`), 'click', () => {
      this.restart()
    })
    // util.eventListener(util.q(`#${this.domId} .tetris-setup`), 'click', () => {
    //   alert('Developing...')
    // })
  }

  // 初始化Div
  initDiv (container: HTMLElement, data: Types.NumberArray[], divs: HTMLElement[][]): void {
    const ieVer: number = util.ieBrowerVersion()
    for (let i = 0; i < data.length; i++) {
      const arr: HTMLElement[] = []
      for (let j = 0; j < data[0].length; j++) {
        const newNode = document.createElement('div')
        newNode.className = 'none'
        if (util.isIEBrower && ieVer <= 9) {
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
  refreshDiv (data: Types.NumberArray[] = this.stageArray, divs: HTMLElement[][] = this.stageDivs): void {
    for (let i = 0; i < data.length; i++) {
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
  resetPos (type = 'set'): void {
    const currSquare = this.currSquare as Square
    let i: number, j: number
    const x = currSquare.origin.x
    const y = currSquare.origin.y
    for (i = 0; i < currSquare.data.length; i++) {
      for (j = 0; j < currSquare.data[0].length; j++) {
        if (util.checkPoint(currSquare.origin, i, j, this.stageArray)) {
          // 清除移动后的方块位置
          if (type === 'clear') {
            this.stageArray[x + i][y + j] = 0
          }
          // 设置移动后方块位置
          else if (type === 'set') {
            this.stageArray[x + i][y + j] = currSquare.data[i][j]
          }
        }
      }
    }
  }

  // 旋转方块
  rotate (): void {
    const currSquare = this.currSquare as Square
    if (currSquare.canRotate(this.stageArray)) {
      this.resetPos('clear')
      currSquare.rotate()
      this.resetPos('set')
      this.refreshDiv()
    }
  }

  // 左移方块
  left (): void {
    const currSquare = this.currSquare as Square
    if (currSquare.canLeft(this.stageArray)) {
      this.resetPos('clear')
      currSquare.left()
      this.resetPos('set')
      this.refreshDiv()
    }
  }

  // 右移方块
  right (): void {
    const currSquare = this.currSquare as Square
    if (currSquare.canRight(this.stageArray)) {
      this.resetPos('clear')
      currSquare.right()
      this.resetPos('set')
      this.refreshDiv()
    }
  }

  // 下移方块
  down (): boolean {
    const currSquare = this.currSquare as Square
    // 判断是否能继续下降
    if (currSquare.canDown(this.stageArray)) {
      this.resetPos('clear')
      currSquare.down()
      this.resetPos('set')
      this.refreshDiv()
      return true
    }
    return false
  }

  // 落下方块
  fall (): void {
    /* eslint-disable no-empty */
    while (this.down()) {}
  }

  // 方块移动到底部，固定方块
  fixed (): void {
    const currSquare = this.currSquare as Square
    let i: number, j: number
    const data = currSquare.data
    // console.log(data)
    for (i = 0; i < data.length; i++) {
      for (j = 0; j < data[0].length; j++) {
        if (util.checkPoint(currSquare.origin, i, j, this.stageArray)) {
          if (this.stageArray[currSquare.origin.x + i][currSquare.origin.y + j] === 2) {
            this.stageArray[currSquare.origin.x + i][currSquare.origin.y + j] = 1
          }
        }
      }
    }
    this.refreshDiv()
  }

  // 检查游戏结束
  checkGameOver (): boolean {
    for (let i = 0; i < this.stageArray[0].length; i++) {
      if (this.stageArray[0][i] === 1) {
        return true
      }
    }
    return false
  }

  // 使用下一个方块
  performNext (type: number, dir: number): void {
    this.currSquare = this.nextSquare
    this.resetPos('set')
    this.nextSquare = this.make(type, dir)
    this.refreshDiv()
    this.refreshDiv(this.nextSquare.data, this.nextDivs)
  }

  // 清除填满方块的整行
  checkClear (): number {
    let i: number
    let j: number
    let m: number
    let n: number
    let line = 0
    const len: number = this.stageArray.length
    for (i = len - 1; i >= 0; i--) {
      let isClear = true
      for (j = 0; j < this.stageArray[0].length; j++) {
        if (this.stageArray[i][j] !== 1) {
          isClear = false
          break
        }
      }
      if (isClear) {
        line += 1
        // 整体下移
        for (m = i; m > 0; m--) {
          for (n = 0; n < this.stageArray[0].length; n++) {
            this.stageArray[m][n] = this.stageArray[m - 1][n]
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
  // addTailLines (lines: number[]): void {
  //   const currSquare = this.currSquare as Square
  //   let i: number, j: number
  //   const aLen = this.stageArray.length
  //   const lLen = lines.length
  //   for (i = 0; i < aLen - lLen; i++) {
  //     this.stageArray[i] = this.stageArray[i + lLen]
  //   }
  //   for (j = 0; j < lLen; j++) {
  //     this.stageArray[aLen - lLen + j] = lines
  //   }
  //   currSquare.origin.x -= lLen
  //   if (currSquare.origin.x < 0) {
  //     currSquare.origin.x = 0
  //   }
  //   this.refreshDiv()
  // }

  // 创建方块(组)
  make (index = 1, dir: number): Square {
    const s: Square = new Square(index)
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
  move (): void {
    if (!this.down()) {
      this.fixed()
      const line: number = this.checkClear()
      this.addScore(line)
      if (this.checkGameOver()) {
        this.stop()
      } else {
        this.performNext(util.rand(7), util.rand(4))
      }
    }
  }

  // 暂停游戏
  pause (): void {
    if (this.isGameOver) return
    if (this.isPause) {
      this.isPause = false
      // @ts-ignore
      this.moveTimer = setInterval(() => {
        this.move()
      }, this.INTERVAL)
      this.gameTimeMeter()
      util.q(`#${this.domId} .tetris-pause`).innerText = 'Pause'
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
      util.q(`#${this.domId} .tetris-pause`).innerText = 'Start'
      // console.log('暂停')
    }
  }

  // 重新开始游戏
  restart (): void {
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
    this.nextSquare = this.make(util.rand(7), util.rand(4))
    this.refreshDiv()
    this.refreshDiv(this.nextSquare.data, this.nextDivs)

    this.isGameOver = false
    this.isPause = false
    // 游戏计时
    this.gameTimeMeter()
    this.INTERVAL = 500
    this.gameTimes = 0
    this.gameScores = 0

    // 下一个方块
    this.performNext(util.rand(7), util.rand(4))
    // @ts-ignore
    this.moveTimer = setInterval(() => {
      this.move()
    }, this.INTERVAL)
    util.q(`#${this.domId} .tetris-pause`).innerText = 'Pause'
    util.q(`#${this.domId}`).className = 'zx-tetris-container'
  }

  // gameOver
  stop (): void {
    this.isGameOver = true
    if (this.moveTimer) {
      clearInterval(this.moveTimer)
      this.moveTimer = null
    }
    util.q(`#${this.domId}`).className = 'zx-tetris-container game-over'
  }

  // 游戏进行时间，单位秒
  gameTimeMeter (): void {
    // @ts-ignore
    this.gameTimer = setInterval(() => {
      this.gameTimes++
      util.q(`#${this.domId} .times`).innerText = util.ft(this.gameTimes)
      if (this.isGameOver && this.gameTimer) {
        clearInterval(this.gameTimer)
        this.gameTimer = null
      }
      // 生成干扰行
      // if (this.gameTimes % 10 === 0) {
      //   this.addTailLines(util.rand(1))
      // }
    }, 1000)
  }

  // 游戏分数统计
  addScore (line: number): void {
    let s = 0
    switch (line) {
      case 1:
        s = 100
        break
      case 2:
        s = 300
        break
      case 3:
        s = 600
        break
      case 4:
        s = 1000
        break
    }
    this.gameScores += s
    util.q(`#${this.domId} .score`).innerText = this.gameScores + ''
    // 下落时间间隔
    this.setDownInterval(this.gameScores)
  }

  // 设置下落时间间隔/速度控制
  setDownInterval (score: number): void {
    if (score > 640000) {
      this._updateSpeed(100)
    } else if (score > 320000) {
      this._updateSpeed(150)
    } else if (score > 160000) {
      this._updateSpeed(200)
    } else if (score > 80000) {
      this._updateSpeed(250)
    } else if (score > 40000) {
      this._updateSpeed(300)
    } else if (score > 20000) {
      this._updateSpeed(350)
    } else if (score > 10000) {
      this._updateSpeed(400)
    } else if (score > 5000) {
      this._updateSpeed(450)
    }
  }

  _updateSpeed(interval: number): void {
    if (interval === this.INTERVAL) return
    this.INTERVAL = interval
    this.moveTimer && clearInterval(this.moveTimer)
    // @ts-ignore
    this.moveTimer = setInterval(() => {
      this.move()
    }, this.INTERVAL)
  }

  // 初始化游戏
  init (): void {
    // 创建游戏DOM
    this.createGameDom()
    this.nextSquare = this.make(util.rand(7), util.rand(4))
    // 初始化舞台方块
    this.initDiv(util.q(`#${this.domId} .tetris-stage`), this.stageArray, this.stageDivs)
    this.initDiv(util.q(`#${this.domId} .next-square`), this.nextSquare.data, this.nextDivs)
    this.refreshDiv(this.nextSquare.data, this.nextDivs)
    this.gameController()

    // 下一个方块
    this.performNext(util.rand(7), util.rand(4))
    // @ts-ignore
    this.moveTimer = setInterval(() => {
      this.move()
    }, this.INTERVAL)

    // 游戏计时
    this.gameTimeMeter()
    // IE浏览器移除底部控制按钮
    if (util.isIEBrower && util.ieBrowerVersion() < 10) {
      const body: any = util.q('body')
      const bodyClassName: string = body.className || ''
      if (bodyClassName.indexOf('ie-brower') === -1) {
        body.className = 'ie-brower ' + bodyClassName
      }
    }
  }
}

export {
  Tetris
}
