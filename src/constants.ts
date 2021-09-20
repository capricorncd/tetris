/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2021-09-20 21:31 (GMT+0900)
 */
import * as Types from '~/types'

// 消息码及提示
export const CODES: Record<string, string> = {
  0: 'Tetris readied',
  1: '浏览器版本过低，请升级浏览器',
  2: '创建Tetris DOM失败，请升级浏览器或引入jQuery/Zepte库'
} as const

// 默认配置参数
export const DEF_OPTIONS: Types.Options = {
  // 游戏容器，默认为body
  container: 'body',
  /* eslint-disable @typescript-eslint/no-empty-function */
  ready: () => {},
  error: () => {}
} as const

export const KEYBOARD_KEYS = {
  SPACE: ' ',
  SHIFT: 'Shift',
  ENTER: 'Enter',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown'
} as const
