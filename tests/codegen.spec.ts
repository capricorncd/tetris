import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  // await page.load
  page.on('load', async () => {
    // Click text=Start >> nth=0
    // await page.locator('.tetris-start-button-wrapper button').waitFor();
    await page.locator('text=Start').first().click()
    // await page.locator('.tetris-start-button-wrapper button').click();
    await expect(page.locator('.tetris-start-button-wrapper')).toBeHidden()
  })

  // Go to https://zx1984.cn/tetris/dist/
  //   await page.goto('http://localhost:9000', { waitUntil: 'networkidle' })
  await page.goto('https://capricorncd.github.io/tetris/dist', { waitUntil: 'networkidle' })

  // await page.waitForEvent('domcontentloaded')
  // await page.waitForLoadState('load');

  // await page.locator('text=Start').first().click();
  // // Click text=PauseEnter
  // await page.locator('text=PauseEnter').click();

  // // Double click text=Right
  // await page.locator('text=Right').dblclick();

  // // Double click text=Left
  // await page.locator('text=Left').dblclick();

  // // Click text=Rotate
  // await page.locator('text=Rotate').click();

  // // Click text=Rotate
  // await page.locator('text=Rotate').click();

  // // Double click text=Down
  // await page.locator('text=Down').dblclick();

  // // Click text=StartEnter
  // await page.locator('text=StartEnter').click();

  // // Click text=OKSPACE
  // await page.locator('text=OKSPACE').click();

  // // Click text=RestartShift
  // await page.locator('text=RestartShift').click();

  // // Click text=PauseEnter
  // await page.locator('text=PauseEnter').click();
})
