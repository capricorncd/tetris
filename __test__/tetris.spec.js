/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/04/25 21:33:36 (GMT+0900)
 */
context('', () => {
  beforeEach(() => {
    cy.visit('https://capricorncd.github.io/tetris/dist')
  })

  it('加载层正常隐藏', () => {
    // 游戏未开始时显示时间为00:00
    cy.get('.game-times .times').should('have.text', '00:00')
    cy.get('.tetris-pause').contains('Pause')
    // Listen to GET to comments/1
    // cy.intercept('GET', '*.mp3').as('getBGM')
    cy.get('.tetris-start-button-wrapper').should('have.css', 'display', 'flex')
    // cy.wait('@getBGM')
    cy.wait(2000)
    cy.get('.tetris-start-button-wrapper button').should('have.text', 'Start')
    cy.get('.tetris-start-button-wrapper button').click()
    cy.get('.tetris-start-button-wrapper').should('have.css', 'display', 'none')

    // 暂停
    cy.get('.tetris-pause').click()
    cy.get('.tetris-pause').contains('Start')
  })
})
