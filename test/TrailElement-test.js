var {expect} = require('chai');
var Player = require('../lib/Player.js')

var TrailElement = require('../lib/TrailElement.js');


describe('TrailElement', () => {
  let trailElement;
  let player;

  beforeEach(() => {
    player = new Player (10, 10);
    trailElement = new TrailElement(player.x, player.y);
  })
  it('Should have x and y properties', () => {
    expect(trailElement.x).to.equal(player.x);
    expect(trailElement.y).to.equal(player.y);
  })
  it('Should inherit properties from Player Class', () => {
    expect(trailElement.x).to.equal(10);
    expect(trailElement.y).to.equal(10);
  })
})
