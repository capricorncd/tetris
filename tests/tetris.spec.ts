/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/23 11:18:23 (GMT+0900)
 */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:9000')
})

test.describe('Before Game Start', () => {
  test('标题被正确设置', async ({ page }) => {
    await expect(page).toHaveTitle('Tetris - 俄罗斯方块单机版 - Capricorncd')
  })

  test('loading图层和start按钮正常显示', async ({ page }) => {
    const startWrapper = page.locator('.tetris-start-button-wrapper')
    await expect(startWrapper).toBeVisible()
    const startButton = page.locator('.tetris-start-button-wrapper button')
    await expect(startButton).toBeVisible()
    await expect(startButton).toHaveText('Start')
  })

  test('点击Start按钮，loading图层被隐藏', async ({ page }) => {
    await page.locator('.tetris-start-button-wrapper button').click()
    const startWrapper = page.locator('.tetris-start-button-wrapper')
    await expect(startWrapper).toBeHidden()
    // await expect(startWrapper).toHaveCSS('display', 'none')
  })
})
