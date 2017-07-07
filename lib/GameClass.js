module.exports = class GameClass {
  constructor() {
    this.trailArray = []
    this.collision = []
    this.isGameOver = false
  }

  fillTrailArray(p1trailElement, p2trailElement) {
    this.trailArray.push(p1trailElement)
    this.trailArray.push(p2trailElement)
  }

  checkBorder(player1, player2, canvas) {
    if (player1.x > canvas.width - player1.width ||
      player1.x < 0 ||
      player1.y > canvas.height - player1.height ||
      player1.y < 0) {
      player1.collided = true;
      return true
    } if (
      (player2.x > canvas.width - player2.width) ||
      player2.x < 0 ||
      player2.y > canvas.height - player2.height ||
      player2.y < 0) {
      player2.collided = true;
      return true
    }
  }

  trailCheck(player1, player2, trailArray) {

    trailArray.forEach(function(trailObj) {
      if (player2.x + 5 <= trailObj.x || player2.x >= trailObj.x + 5
        || player2.y + 5 <= trailObj.y || player2.y >= trailObj.y + 5) {
        return true
      } else {
        player2.collided = true;
        this.collision.push(trailObj)
      }
    })

    trailArray.forEach(function(trailObj) {
      if (player1.x + 5 <= trailObj.x || player1.x >= trailObj.x + 5
        || player1.y + 5 <= trailObj.y || player1.y >= trailObj.y + 5) {
        return false
      } else {
        player1.collided = true;
        this.collision.push(trailObj)
      }
    })

    if (this.collision.length > 0) {
      return true
    }
  }

  clearTrailArrays() {
    this.trailArray = []
    this.collision = []
  }

  checkForGameOver(player1, player2) {
    if (player1.lives === 0 || player2.lives === 0) {
      this.isGameOver = true
    }
  }
}
