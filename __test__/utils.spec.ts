/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/25 21:34:08 (GMT+0900)
 */
/// <reference types="cypress" />
import util, { getMaxScore, setMaxScore } from '../src/util'

const stageArray = [
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

context('util', () => {
  it('rand', () => {
    const rand = util.rand(5)
    expect( rand > 0 && rand <= 5).to.eq(true)
  })
  it('ft', () => {
    expect(util.ft(100)).to.eq('01:40')
  })

  it('fd', () => {
    expect(util.fd(3)).to.eq('03')
    expect(util.fd(30)).to.eq('30')
  })

  it('checkPoint', () => {
    expect(util.checkPoint({x: 0, y: 0}, 2, 3, stageArray)).to.eq(true)
    expect(util.checkPoint({x: 0, y: 0}, 0, 10, stageArray)).to.eq(false)
  })
})

context('other', () => {
  it('get/setMaxScore', () => {
    setMaxScore(101)
    expect(getMaxScore()?.score).to.eq(101)
  })
})


