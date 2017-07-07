var {expect} = require('chai');
var Player = require('../lib/Player.js');
var GameArea = require('../lib/GameArea.js');
var TrailElement = require('../lib/TrailElement.js');


describe('Tron Game', () => {

  let player1
  let player2
  let trailelementP1
  let trailelementP2
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
    player1 = new Player(10, 250, 10, 10, '#FFDD33', 'none')
    player2 = new Player(490, 250, 10, 10, 'red', 'none')
    trailElementP1 = new TrailElement(player1.x, player1.y)
    trailelementP2 = new TrailElement(player2.x, player2.y)
    gameArea = new GameArea(500, 500, canvas, context, 10)
  })

  it('Should add previous player locations to trail element', () => {
    let trailArray = []

    expect(player1.x).to.equal(10)
    expect(player1.y).to.equal(250)
    player1.direction = 'right'
    player1.move()
    trailArray.push(trailelementP1)
    expect(player1.x).to.equal(20)
    expect(player1.y).to.equal(250)
    expect(trailArray.length).to.equal(1)
    player1.move()
    trailArray.push(trailelementP1)
    expect(player1.x).to.equal(30)
    expect(player1.y).to.equal(250)
    expect(trailArray.length).to.equal(2)
  })

  it()
})
