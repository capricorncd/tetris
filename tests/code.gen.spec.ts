/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/29 17:16:49 (GMT+0900)
 */
import { test, expect } from '@playwright/test'

test.only('test', async ({ page }) => {
  // Go to https://capricorncd.github.io/tetris/dist
  await page.goto('https://capricorncd.github.io/tetris/dist')
  // Waiting for BGM to load
  await page.waitForTimeout(2000)
  // Click text=Start >> nth=0
  await page.locator('text=Start').first().click()
  // Click text=Rotate
  await page.locator('text=Rotate').click()
  // Press ArrowDown
  await page.locator('text=Rotate').press('ArrowDown')
  // Press ArrowDown
  await page.locator('text=Rotate').press('ArrowDown')
  // Press ArrowRight
  await page.locator('text=Rotate').press('ArrowRight')
  // Press ArrowDown
  await page.locator('text=Rotate').press('ArrowDown')
  // Press ArrowLeft
  await page.locator('text=Rotate').press('ArrowLeft')
  // Press ArrowUp
  await page.locator('text=Rotate').press('ArrowUp')
  // Press ArrowRight
  await page.locator('text=Rotate').press('ArrowRight')
  // Click text=PauseEnter
  await page.locator('text=PauseEnter').click()
  // Click text=StartEnter
  await page.locator('text=StartEnter').click()
  // Press ArrowRight
  await page.locator('text=PauseEnter').press('ArrowRight')
  // Click text=OKSPACE
  await page.locator('text=OKSPACE').click()
  // Click text=+
  await page.locator('text=+').click()
  // Double click text=-
  await page.locator('text=-').dblclick()
  // Click text=PauseEnter
  await page.locator('text=PauseEnter').click()
  // Click text=RestartShift
  await page.locator('text=RestartShift').click()
  // Press ArrowUp
  await page.locator('text=RestartShift').press('ArrowUp')
  // Click text=RestartShift
  await page.locator('text=RestartShift').click()
  // Click text=PauseEnter
  await page.locator('text=PauseEnter').click()
  // The text of the pause button has been changed.
  await expect(page.locator('text=StartEnter')).toHaveCount(1)
})
