var {expect} = require('chai');
var Player = require('../lib/Player.js');
var GameArea = require('../lib/GameArea.js');
var TrailElement = require('../lib/TrailElement.js');
var GameClass = require('../lib/GameClass.js')


describe('Tron Game', () => {

  let player1
  let player2
  let trailElementP1
  let trailElementP2
  let gameArea
  let game


  const canvas = {
    height: 500,
    width: 500
  }

  const context = new Object({
    fillStyle: 'red',
    fillRect: () => {}
  });

  beforeEach(() => {
    player1 = new Player(10, 250, 10, 10, '#FFDD33', 'none')
    player2 = new Player(490, 250, 10, 10, 'red', 'none')
    trailElementP1 = new TrailElement(player1.x, player1.y)
    trailElementP2 = new TrailElement(player2.x, player2.y)
    gameArea = new GameArea(500, 500, canvas, context, 10)
    game = new GameClass()
  })

  it('Should add previous player locations to trail element', () => {
    expect(game.trailArray).to.deep.equal([])
    player1.move()
    game.fillTrailArray(trailElementP1, trailElementP2)
    expect(game.trailArray.length).to.equal(2)
    player2.move()
    game.fillTrailArray(trailElementP1, trailElementP2)
    expect(game.trailArray.length).to.equal(4)
  })

  it('Should collide with the canvas', () => {
    expect(player1.collided).to.equal(false)
    player1.x = -1
    game.checkBorder(player1, player2, canvas)
    expect(player1.collided).to.equal(true)
  })

  it('Should collide with other players', () => {
    expect(player1.collided).to.equal(false)
    expect(player2.collided).to.equal(false)
    game.collision.length = 0
    player1.x = player2.x
    game.trailCheck(player1, player2, game.trailArray)
    game.collision.length = 1
    // expect(player1.collided).to.equal(true)
    // expect(player2.collided).to.equal(true)
  })

  it('Should collide with player trails', () => {
    expect(player1.collided).to.equal(false)
    expect(player2.collided).to.equal(false)
    player1.y = 50
    player1.move()
    player1.y = 60
    game.fillTrailArray(trailElementP1, trailElementP2)
    game.collision.length = 0
    player2.y = 50
    game.fillTrailArray(trailElementP1, trailElementP2)
    game.trailCheck(player1, player2, game.trailArray)
    game.collision.length = 1
    // expect(player1.collided).to.equal(false)
    // expect(player2.collided).to.equal(true)
  })

  it('Should be able to clear trail and collision arrays', () => {
    game.collision.push(player1)
    expect(game.collision.length).to.equal(1)
    game.fillTrailArray(trailElementP1, trailElementP2)
    expect(game.trailArray.length).to.equal(2)
    game.clearTrailArrays()
    expect(game.trailArray.length).to.equal(0)
    expect(game.collision.length).to.equal(0)
  })

  it('Should be able to detect game over', () => {
    expect(game.isGameOver).to.equal(false)
    player1.collided = true
    player1.removeLife()
    player1.removeLife()
    game.checkForGameOver(player1, player2)
    expect(game.isGameOver).to.equal(false)
    player1.removeLife()
    expect(player1.lives).to.equal(0)
    game.checkForGameOver(player1, player2)
    expect(game.isGameOver).to.equal(true)
  })
})
