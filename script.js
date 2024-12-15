const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const leftScoreElement = document.getElementById('bounce');
const rightScoreElement = document.getElementById('bounce2');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');

let ballX = 390, ballY = 190;
let ballSpeedX = 2, ballSpeedY = 2;
let paddleLeftY = 150, paddleRightY = 150;
let paddleSpeed = 20;
let leftScore = 0, rightScore = 0;
let gameInterval;

// 초기화 함수
function initializeGame() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

// 공 이동 함수
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) ballSpeedX = -ballSpeedX;
    if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) ballSpeedX = -ballSpeedX;

    if (ballX <= 0) { rightScore++; resetBall(); updateScore(); }
    if (ballX >= 780) { leftScore++; resetBall(); updateScore(); }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// 패들 이동
function movePaddles() {
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

// 점수 업데이트
function updateScore() {
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
}

// 공 초기화
function resetBall() {
    ballX = 390;
    ballY = 190;
    ballSpeedX = ballSpeedX > 0 ? -2 : 2; // 방향 반대로
    ballSpeedY = ballSpeedY > 0 ? -2 : 2;
}

// 게임 루프
function gameLoop() {
    moveBall();
    movePaddles();
}

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') paddleLeftY -= paddleSpeed;
    if (e.key === 's') paddleLeftY += paddleSpeed;
    if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
    if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
});

// 게임 리셋
restartButton.addEventListener('click', () => {
    leftScore = 0;
    rightScore = 0;
    resetBall();
    updateScore();
    winnerMessage.style.display = 'none';
});

// 게임 시작
initializeGame();
gameInterval = setInterval(gameLoop, 16);
