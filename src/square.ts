/**
 * Create by Capricorncd
 * Sat Oct 21 2017 18:49:07 GMT+0800
 * https://github.com/capricorncd
 */
import util from './util'
import * as Types from '../types'

/**
 * ***************************************************
 * Square 英[skweə(r)] 美[skwer]
 * ***************************************************
 */
class Square {
  // 方块矩阵
  data: Types.NumberArray[] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  // 各种形状方块(组)
  SQUARES: Record<string, Types.NumberArray[][]> = {
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
  origin: Types.SquareOrigin = {
    x: 0,
    y: 0
  }

  // 随机方向
  // direction 英[dəˈrekʃn] 美[dɪˈrɛkʃən, daɪ-]
  dir = 0
  // 当前方块
  rotates: Types.NumberArray[][]

  // constructor
  constructor (index = 0) {
    this.rotates = this.SQUARES[index]
  }

  // 检查数据是否合法
  isValid (pos: Types.SquareOrigin, data: Types.NumberArray[], stageArray: Types.NumberArray[]): boolean {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[0].length; j++) {
        if (data[i][j] !== 0) {
          if (!util.checkPoint(pos, i, j, stageArray)) {
            return false
          }
        }
      }
    }
    return true
  }

  // 是否能旋转
  canRotate (stageArray: Types.NumberArray[]): boolean {
    const len: number = this.rotates.length
    const index: number = (this.dir + 1) % len
    const test: Types.NumberArray[] = [
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

  rotate (num = 1): void {
    let i: number, j: number
    this.dir = (this.dir + num) % this.rotates.length
    for (i = 0; i < this.data.length; i++) {
      for (j = 0; j < this.data[0].length; j++) {
        this.data[i][j] = this.rotates[this.dir][i][j]
      }
    }
  }

  // 是否能下降
  canDown (stageArray: Types.NumberArray[]): boolean {
    const test: any = {}
    test.x = this.origin.x + 1
    test.y = this.origin.y
    return this.isValid(test, this.data, stageArray)
  }

  down (): void {
    this.origin.x += 1
  }

  // 是否能左移
  canLeft (stageArray: Types.NumberArray[]): boolean {
    const test: any = {}
    test.x = this.origin.x
    test.y = this.origin.y - 1
    return this.isValid(test, this.data, stageArray)
  }

  left (): void {
    this.origin.y -= 1
  }

  // 是否能右移
  canRight (stageArray: Types.NumberArray[]): boolean {
    const test: any = {}
    test.x = this.origin.x
    test.y = this.origin.y + 1
    return this.isValid(test, this.data, stageArray)
  }

  right (): void {
    this.origin.y += 1
  }

  // 是否能上移
  canUp (stageArray: Types.NumberArray[]): boolean {
    const test: any = {}
    test.x = this.origin.x - 1
    test.y = this.origin.y
    return this.isValid(test, this.data, stageArray)
  }

  up (): void {
    this.origin.x -= 1
  }
}

export default Square
