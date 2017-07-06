var { expect } = require('chai');
var GameArea = require('../lib/GameArea.js');


describe('GameArea', () => {

  let gameArea

  const canvas = {
    height: 500,
    width: 500
  }

  const context = new Object({
    fillStyle: 'red',
    fillRect: () => {}
  });

  beforeEach(() => {
    gameArea = new GameArea(canvas.height, canvas.width, canvas, context, 10)
  })

  it('Should have a height and a width', () => {
    expect(gameArea.height).to.equal(500)
    expect(gameArea.width).to.equal(500)
  })
  it('Should contain the canvas and context elements', () => {
    expect(gameArea.canvas).to.equal(canvas)
    expect(gameArea.context).to.equal(context)
  })
  it('Should evaluate the correct gridAmount', () => {
    expect(gameArea.gridAmount).to.equal(50)
  })
  it('Should be able to draw the Grid', () => {
    expect(gameArea.drawGrid).to.exist
  })
  it('Should be able to clear the Grid', () => {
    expect(gameArea.clearBoard).to.exist
  })
})
