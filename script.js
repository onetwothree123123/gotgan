const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const leftScoreElement = document.getElementById('bounce');
const rightScoreElement = document.getElementById('bounce2');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');

// 모바일 컨트롤 버튼
const leftUpButton = document.getElementById('left-up');
const leftDownButton = document.getElementById('left-down');
const rightUpButton = document.getElementById('right-up');
const rightDownButton = document.getElementById('right-down');

let ballX = 390, ballY = 190;
let ballSpeedX = 2, ballSpeedY = 2;
let paddleLeftY = 150, paddleRightY = 150;
let paddleSpeed = 20;
let leftScore = 0, rightScore = 0;
let gameInterval;
let isGameOver = false;

// 초기화 함수
function initializeGame() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

// 공 이동 함수
function moveBall() {
    if (isGameOver) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) ballSpeedX = -ballSpeedX;
    if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) ballSpeedX = -ballSpeedX;

    if (ballX <= 0) {
        rightScore++;
        resetBall();
        updateScore();
        checkWinner();
    }
    if (ballX >= 780) {
        leftScore++;
        resetBall();
        updateScore();
        checkWinner();
    }

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
    ballSpeedX = ballSpeedX > 0 ? -2 : 2;
    ballSpeedY = ballSpeedY > 0 ? -2 : 2;
}

// 우승 확인
function checkWinner() {
    if (leftScore >= 5) {
        showWinner('Red');
    } else if (rightScore >= 5) {
        showWinner('Blue');
    }
}

// 우승 메시지 표시
function showWinner(winner) {
    isGameOver = true;
    winnerMessage.textContent = `Winner: ${winner}`;
    winnerMessage.style.color = winner.toLowerCase();
    winnerMessage.style.display = 'block';
    clearInterval(gameInterval);
}

// 키보드 입력
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') paddleLeftY -= paddleSpeed;
    if (e.key === 's') paddleLeftY += paddleSpeed;
    if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
    if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
});

// 모바일 컨트롤 버튼 이벤트
leftUpButton.addEventListener('click', () => {
    paddleLeftY -= paddleSpeed;
    movePaddles();
});

leftDownButton.addEventListener('click', () => {
    paddleLeftY += paddleSpeed;
    movePaddles();
});

rightUpButton.addEventListener('click', () => {
    paddleRightY -= paddleSpeed;
    movePaddles();
});

rightDownButton.addEventListener('click', () => {
    paddleRightY += paddleSpeed;
    movePaddles();
});

// 게임 루프
function gameLoop() {
    moveBall();
    movePaddles();
}

// 게임 리셋
restartButton.addEventListener('click', () => {
    leftScore = 0;
    rightScore = 0;
    isGameOver = false;
    updateScore();
    resetBall();
    initializeGame();
    winnerMessage.style.display = 'none';
    gameInterval = setInterval(gameLoop, 16);
});

// 게임 시작
initializeGame();
gameInterval = setInterval(gameLoop, 16);
