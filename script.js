let ball = document.getElementById('ball');
let paddleLeft = document.getElementById('paddle-left');
let paddleRight = document.getElementById('paddle-right');
let leftScoreElement = document.getElementById('bounce');
let rightScoreElement = document.getElementById('bounce2');
let winnerMessage = document.getElementById('winner-message');
let restartButton = document.getElementById('restartButton');
let countdownElement = document.getElementById('countdown');

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
let speedIncreaseInterval = 30;

// 공 이동 함수
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // 공이 세로 벽에 닿으면 튕기도록 설정
  if (ballY <= 0 || ballY >= 380) {
    ballSpeedY = -ballSpeedY;
  }

  // 가로벽을 추가 (2.5에서 6 사이에서 튕기도록 설정)
  if (ballY >= 25 && ballY <= 60) {
    ballSpeedY = -ballSpeedY;
  }

  // 패들에 닿았을 때 공의 반사
  if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) {
    ballSpeedX = -ballSpeedX;
  }

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
  if (paddleLeftY < 0) paddleLeftY = 0;
  if (paddleLeftY > 300) paddleLeftY = 300;
  if (paddleRightY < 0) paddleRightY = 0;
  if (paddleRightY > 300) paddleRightY = 300;

  paddleLeft.style.top = paddleLeftY + 'px';
  paddleRight.style.top = paddleRightY + 'px';
}

// 공 초기화 함수
function resetBall() {
  ballX = 390;
  ballY = 190;
  ballSpeedX = 0;
  ballSpeedY = 0;
}

// 점수 업데이트 함수
function updateScore() {
  leftScoreElement.textContent = leftScore;
  rightScoreElement.textContent = rightScore;
}

// 게임 시간이 30초마다 증가하는 속도 적용
function increaseSpeed() {
  gameTime++;

  if (gameTime % speedIncreaseInterval === 0) {
    ballSpeedX += ballSpeedX > 0 ? 0.5 : -0.5;
    ballSpeedY += ballSpeedY > 0 ? 0.5 : -0.5;
  }
}

// 우승 여부를 확인하는 함수
function checkWinner() {
  if (leftScore >= 5) {
    winnerMessage.textContent = 'Winner: RED';
    winnerMessage.style.color = 'red';
    winnerMessage.style.display = 'block';
    disableGame();
  } else if (rightScore >= 5) {
    winnerMessage.textContent = 'Winner: BLUE';
    winnerMessage.style.color = 'blue';
    winnerMessage.style.display = 'block';
    disableGame();
  }
}

// 게임을 비활성화하는 함수 (게임 종료)
function disableGame() {
  clearInterval(gameInterval);
  document.removeEventListener('keydown', handlePaddleMovement);
}

// 사용자 입력을 통해 패들 이동
function handlePaddleMovement(e) {
  if (e.key === 'w') paddleLeftY -= paddleSpeed;
  if (e.key === 's') paddleLeftY += paddleSpeed;
  if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
  if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
}

// 게임 루프
function gameLoop() {
  moveBall();
  movePaddles();
  increaseSpeed(); // 속도 증가 확인
}

let gameInterval = setInterval(gameLoop, 1000 / 60); // 60 FPS

document.addEventListener('keydown', handlePaddleMovement);

// 재시작 버튼 클릭 이벤트 처리
restartButton.addEventListener('click', () => {
  // 점수 초기화
  leftScore = 0;
  rightScore = 0;
  updateScore();

  // 공을 중앙에 배치하고 카운트다운 표시
  ballX = 390;
  ballY = 190;
  ballSpeedX = 0;
  ball
