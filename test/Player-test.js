var {expect} = require('chai');
var Player = require('../lib/Player.js');

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player(10, 10, 10, 10, 'purple', 'none');
  })
  it('Should be an object', () => {
    expect(player).to.be.an('object')
  })
  it('Should have properties', () => {
    expect(player).to.include({isStopped: true})
  })
  it('Should be able to accept parameters', () => {
    let player2 = new Player(20, 20, 20, 20, 'red', 'left')

    expect(player).to.deep.equal({x: 10, y: 10, width: 10, height: 10, color: 'purple', direction: 'none', isStopped: true, collided: false, lives: 3})
    expect(player2).to.deep.equal({x: 20, y: 20, width: 20, lives: 3, isStopped: true, height: 20, color: 'red', direction: 'left',  collided: false})
  })
  it('Should have an x and y value', () => {
    expect(player.x).to.equal(10);
    expect(player.y).to.equal(10);
  })
  it('Should have a width and a height', () => {
    expect(player.width).to.equal(10);
    expect(player.height).to.equal(10);
  })
  it('Should have a color', () => {
    expect(player.color).to.equal('purple');
  })
  it('Should have a direction', () => {
    expect(player.direction).to.equal('none');
  })
  it('Should default to stopped', () => {
    expect(player.isStopped).to.equal(true);
  })
  it('Should default to not colliding', () => {
    expect(player.collided).to.equal(false);
  })
  it('Should default to having 3 lives', () => {
    expect(player.lives).to.equal(3);
  })
  it('Should be able to move based on keys', () => {
    player.direction = 'up';
    player.move()
    expect(player.y).to.equal(0)
    player.direction = 'down';
    player.move()
    expect(player.y).to.equal(10)
    player.direction = 'left';
    player.move()
    expect(player.x).to.equal(0)
    player.direction = 'right';
    player.move()
    expect(player.x).to.equal(10)
  })
  it('Should be able to stop movement', () => {
    expect(player.y).to.equal(10);
    player.direction = 'down';
    player.move();
    expect(player.y).to.equal(20);
    player.stopMovement();
    expect(player.direction).to.equal('none');
    player.move();
    expect(player.y).to.equal(20);

  })
  it('Should lose a life if it collides', () => {
    expect(player.lives).to.equal(3);
    player.collided = true;
    player.removeLife();
    expect(player.lives).to.equal(2);
  })
  it.skip('Should be able to reset its properties', () => {
    player.lives = 0
    player.x = 0
    player.y = 0
    player.direction = 'right'
    player.isStopped = false
    player.collided = false
    player.reset()
    expect(player.lives).to.equal(3)
    expect(player.x).to.equal(10)
    expect(player.y).to.equal(10)
    expect(player.direction).to.equal('none')
    expect(player.isStopped).to.equal(true)
    expect(player.collided).to.equal(false)
  })
})
