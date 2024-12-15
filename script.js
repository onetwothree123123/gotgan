let ball = document.getElementById('ball');
let paddleLeft = document.getElementById('paddle-left');
let paddleRight = document.getElementById('paddle-right');
let leftScoreElement = document.getElementById('bounce');
let rightScoreElement = document.getElementById('bounce2');
let winnerMessage = document.getElementById('winner-message');
let restartButton = document.getElementById('restartButton');

let ballX = 390;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;

let paddleLeftY = 150;
let paddleRightY = 150;
let paddleSpeed = 20;

let leftScore = 0;
let rightScore = 0;

let gameTime = 0;
const speedIncreaseInterval = 30;

// 공 이동 함수
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;

  if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) ballSpeedX = -ballSpeedX;
  if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) ballSpeedX = -ballSpeedX;

  if (ballX <= 0) {
    rightScore++;
    updateScore();
    checkWinner();
    resetBall();
  }

  if (ballX >= 780) {
    leftScore++;
    updateScore();
    checkWinner();
    resetBall();
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

// 패들 이동 함수
function movePaddles() {
  paddleLeft.style.top = paddleLeftY + 'px';
  paddleRight.style.top = paddleRightY + 'px';
}

// 점수 업데이트 함수
function updateScore() {
  leftScoreElement.textContent = leftScore;
  rightScoreElement.textContent = rightScore;
}

// 게임 루프
function gameLoop() {
  moveBall();
  movePaddles();
  requestAnimationFrame(gameLoop);
}

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
  if (e.key === 'w') paddleLeftY -= paddleSpeed;
  if (e.key === 's') paddleLeftY += paddleSpeed;
  if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
  if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
});

// 게임 시작
gameLoop();
