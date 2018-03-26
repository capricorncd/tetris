/**
 * Create by zx1984
 * Sat Oct 21 2017 18:49:07 GMT+0800
 * https://github.com/zx1984
 */
import util from './util'
/**
 * ***************************************************
 * Square 英[skweə(r)] 美[skwer]
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
  // direction 英[dəˈrekʃn] 美[dɪˈrɛkʃən, daɪ-]
  dir: number = 0
  // 当前方块
  rotates: any

  // constructor
  constructor (index: number = 0) {
    this.rotates = this.SQUARES[index]
  }

  // 检查数据是否合法
  isValid (pos: any, data: any, stageArray: any) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] != 0) {
          if (!util.checkPoint(pos, i, j, stageArray)) {
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

export default Square
