/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/23 11:18:23 (GMT+0900)
 */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  // await page.goto('http://localhost:9000')
  await page.goto('https://capricorncd.github.io/tetris/dist')
})

// ゲームが始まる前
test.describe('Before Game Start', () => {
  // タイトルがセットされたこと
  test('标题被正确设置', async ({ page }) => {
    await expect(page).toHaveTitle('Tetris - 俄罗斯方块单机版 - Capricorncd')
  })

  // ロードレイヤーとスタートボタンが表示されたこと
  test('loading图层和start按钮正常显示', async ({ page }) => {
    // ロードレイヤーが表示されてる
    const startWrapper = page.locator('.tetris-start-button-wrapper')
    await expect(startWrapper).toBeVisible()
    // ボタンが表示されてる
    const startButton = page.locator('.tetris-start-button-wrapper button')
    await expect(startButton).toBeVisible()
    // ボタンのテクストはStartである
    await expect(startButton).toHaveText('Start')
  })

  // メーディアファイルロード完了後、スタートボタンを押すと、ロードレイヤーが非表示されること
  test('点击Start按钮，loading图层被隐藏', async ({ page }) => {
    // await page.waitForLoadState('load')
    // 2秒まつ
    await page.waitForTimeout(2000)
    // Startボタンが存在する（ロード完了前n％が表示されてる）
    await expect(await page.waitForSelector('.tetris-start-button-wrapper >> text=Start')).toBeTruthy()
    // Startボタンを押す
    await page.locator('.tetris-start-button-wrapper button').click()
    const startWrapper = page.locator('.tetris-start-button-wrapper')
    // ロードレイヤーが非表示される
    await expect(startWrapper).toBeHidden()
    await expect(startWrapper).toHaveCSS('display', 'none')
  })

  // ステージと次のブロックが正常に初期化されたこと
  test('舞台初始化成功', async ({ page }) => {
    await expect(page.locator('.tetris-stage > div')).toHaveCount(200)
    // ブロックがステージに入ってる
    // 初始状态有一组方块被显示在舞台上
    await expect(page.locator('.tetris-stage .current')).toHaveCount(4)
    // 次のブロックが作成されておる
    // 下一个方块也准备就绪
    await expect(page.locator('.next-square .current')).toHaveCount(4)
  })
})
