const Player = require('./Player.js')
const TrailElement = require('./TrailElement.js')
const soundFx = require('./soundFx.js')
const GameArea = require('./GameArea.js')

const canvas = document.getElementById('canvas-element')
const context = canvas.getContext('2d')
const canvasOverlay = document.getElementById('canvas-overlay')
const contextOverlay = canvasOverlay.getContext('2d')
const $canvasOverlay = $('#canvas-overlay')
const $easyBtn = $('.easy')
const $normalBtn = $('.normal')
const $hardBtn = $('.hard')
const $pauseBtn = $('.pause-btn')
const $resetBtn = $('.reset-game-btn')

let player1 = new Player(0, (canvas.height / 2 - 5), 10, 10, '#FFDD33', 'none')
let player2 = new Player(canvas.width - 10, (canvas.height / 2 - 5), 10, 10, 'red', 'none')
let gridLines
let isGameOver = false
let isGamePaused = false
let gameStart = false
let trailArray = []
let countdownFinish = false
let newGameState = true
let fps = 15
let countDownNum
let resetGamePress = false
let playerArray = [
  player1,
  player2
]

gameLoop()
gameLoad()

function gameLoad() {
  displayNewGameText()
  resetContainer()
  document.addEventListener('keydown', player1.handleKeyP1.bind(player1))
  document.addEventListener('keydown', player2.handleKeyP2.bind(player2))
  canvas.focus()
}

function gameLoop() {
  canvas.focus()
  for (let i = 0; i < playerArray.length; i++) {
    playerArray[i].draw(context)
  }
  if (gameStart === true) {
    if (isGameOver === false && isGamePaused === false) {
      setTimeout(function() {
        let trailelementP1 = new TrailElement(player1.x, player1.y)

        let trailelementP2 = new TrailElement(player2.x, player2.y)

        trailArray.push(trailelementP1)
        trailArray.push(trailelementP2)
        player1.move()
        player2.move()
        trailCheck()
        borderCheck()
        requestAnimationFrame(gameLoop)
      }, 1000 / fps)
    }
  }
}

document.addEventListener('keydown', function(e) {
  if (e.keyCode === 80 && countdownFinish === true) {
    pauseGame()
  } else if (e.keyCode === 82) {
    resetGame()
    canvas.focus()
  } else if (e.keyCode === 13 && newGameState) {
    e.preventDefault()
    resetGamePress = false
    hideCanvasOverlay()
    countDown()
    gameStart = true
  }
})

$pauseBtn.on('click', function() {
  if (countdownFinish === true) {
    pauseGame()
    canvas.focus()
  }
})

$easyBtn.on('click', () => fps = 10)
$normalBtn.on('click', () => fps = 15)
$hardBtn.on('click', () => fps = 25)
$resetBtn.on('click', resetGame)

function borderCheck() {
  if (player1.x > canvas.width - player1.width ||
    player1.x < 0 ||
    player1.y > canvas.height - player1.height ||
    player1.y < 0) {
    player1.collided = true
    roundEnd()
  } if (
    (player2.x > canvas.width - player2.width) ||
    player2.x < 0 ||
    player2.y > canvas.height - player2.height ||
    player2.y < 0) {
    player2.collided = true
    roundEnd()
  }
}

function checkGameOver() {
  if (player1.lives <= 0 && player2.lives <= 0) {
    gameOverText('Nobody')
    isGameOver = true
  } else if (player2.lives <= 0) {
    gameOverText('Player 1')
    isGameOver = true
  } else if (player1.lives <= 0) {
    gameOverText('Player 2')
    isGameOver = true
  }
}

function checkRoundWinner() {
  if (player1.collided === true && player2.collided === true) {
    roundWinnerText('Nobody')
  } else if (player1.collided === true) {
    roundWinnerText('Player 2')
  } else if (player2.collided === true) {
    roundWinnerText('Player 1')
  }
}

function clearOverlay() {
  contextOverlay.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height)
}

function countDown() {
  isGamePaused = true
  countDownNum = 3
  contextOverlay.strokeStyle = 'cyan'
  contextOverlay.font = '100px Tr2n'
  showCanvasOverlay()
  countDownStart()
}

function countDownStart() {
  if (countDownNum > 0 && resetGamePress === false) {
    if (countDownNum > 1) {
      contextOverlay.strokeText(`${countDownNum}`, canvasOverlay.width / 2 - 40, 500 - countDownNum * 100)
    } else {
      contextOverlay.strokeText(`${countDownNum}`, canvasOverlay.width / 2 - 17, 500 - countDownNum * 100)
    }
    countDownNum--
    setTimeout(countDownStart, 1000)
  } else if (resetGamePress === false) {
    countDownOGStates()
    hideCanvasOverlay()
    gameLoop()
  }
}

function countDownOGStates() {
  isGamePaused = false
  newGameState = false
  countdownFinish = true
  gameStart = true
}

function displayNewGameText() {
  contextOverlay.strokeStyle = 'cyan'
  contextOverlay.font = '40px Tr2n'
  contextOverlay.strokeText('Hit Enter', canvasOverlay.width / 2 - 110, canvasOverlay.height / 2 - 72)
  contextOverlay.strokeText('To Enter The Grid', 30, canvasOverlay.height / 2 + 30)
}

function displayRoundWinner() {
  checkRoundWinner()
  checkGameOver()
  setTimeout(function() {
    if (isGameOver === false) {
      hideCanvasOverlay()
      updateLifeCounter()
      updateScoreDisplay()
      resetContainer()
      trailArray = []
      countDown()
    }
  }, 2000)
}

function gameOverText(winner) {
  clearOverlay()
  contextOverlay.strokeStyle = 'cyan'
  contextOverlay.font = '50px Tr2n'
  contextOverlay.strokeText('GAME OVER', canvasOverlay.width / 2 - 200, canvasOverlay.height / 2 - 72)
  contextOverlay.strokeText(`${winner} Wins!`, canvasOverlay.width / 2 - 200, canvasOverlay.height / 2 + 30)
}

function hideCanvasOverlay() {
  $canvasOverlay.hide()
  clearOverlay()
}

function originalGameStates() {
  resetGamePress = true
  newGameState = true
  isGameOver = false
  gameStart = false
  trailArray = []
  countdownFinish = false
}

function pauseGame() {
  isGamePaused = !isGamePaused
  if (isGamePaused === false) {
    gameLoop()
  }
}

function resetContainer() {
  resetGrid()
  resetPlayer1()
  resetPlayer2()
}

function resetGame() {
  originalGameStates()
  hideCanvasOverlay()
  resetLives()
  resetContainer()
  showCanvasOverlay()
  displayNewGameText()
  updateScoreDisplay()
}

function resetGrid () {
  context.clearRect(0, 0, canvas.width, canvas.height)
  gridLines = new GameArea(canvas.height, canvas.width, canvas, context, 17)
  gridLines.drawGrid()
}

function resetLives() {
  player1.lives = 3
  player2.lives = 3
}

function resetPlayer1() {
  player1.isStopped = false
  player1.direction = 'right'
  player1.collided = false
  player1.x = 0
  player1.y = ((canvas.height / 2) - (player1.height / 2))
}

function resetPlayer2() {
  player2.isStopped = false
  player2.direction = 'left'
  player2.collided = false
  player2.x = canvas.width - player2.width
  player2.y = ((canvas.height / 2) - (player2.height / 2))
}

function roundEnd() {
  countdownFinish = true
  isGamePaused = true
  stopPlayers()
  displayRoundWinner()
}

function roundWinnerText(winner) {
  showCanvasOverlay()
  contextOverlay.strokeStyle = 'cyan'
  contextOverlay.font = '40px Tr2n'
  contextOverlay.strokeText(winner, canvasOverlay.width / 2 - 130, canvasOverlay.height / 2 - 72)
  contextOverlay.strokeText(`Wins Round`, canvasOverlay.width / 2 - 150, canvasOverlay.height / 2 + 30)
}

function showCanvasOverlay() {
  $canvasOverlay.show()
}

function stopPlayers() {
  player1.isStopped = true
  player2.isStopped = true
  player1.stopMovement()
  player2.stopMovement()
}

function trailCheck() {
  let {x: x1, y: y1} = player1
  let {x: x2, y: y2} = player2
  let collision = []

  trailArray.forEach(function(trailObj) {
    if (x2 + 5 <= trailObj.x || x2 >= trailObj.x + 5
      || y2 + 5 <= trailObj.y || y2 >= trailObj.y + 5) {
      return true
    } else {
      player2.collided = true
      collision.push(trailObj)
    }
  })

  trailArray.forEach(function(trailObj) {
    if (x1 + 5 <= trailObj.x || x1 >= trailObj.x + 5
      || y1 + 5 <= trailObj.y || y1 >= trailObj.y + 5) {
      return true
    } else {
      player1.collided = true
      collision.push(trailObj)
    }
  })

  if (collision.length > 0) {
    roundEnd()
  }
}

function updateLifeCounter() {
  if (player1.collided === true && player2.collided === true && player1.lives !== 0 && player2.lives !== 0) {
    player1.removeLife()
    player2.removeLife()
  } else if (player1.lives <= 0 || player2.lives <= 0) {
    checkGameOver()
  } else if (player1.collided === true && player1.lives !== 0) {
    player1.removeLife()
  } else if (player2.collided === true && player2.lives !== 0) {
    player2.removeLife()
  }
}

function updateScoreDisplay () {
  $('.p1-lives').text(player1.lives)
  $('.p2-lives').text(player2.lives)
}
