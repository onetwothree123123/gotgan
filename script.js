// DOM 요소 가져오기
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

// 게임 상태 변수
let ballX = 390, ballY = 190;
let ballSpeedX = 5; // 공의 초기 속도 (X축 빠르게)
let ballSpeedY = 5; // 공의 초기 속도 (Y축 빠르게)
let paddleLeftY = 150, paddleRightY = 150;
let paddleSpeed = 20;
let leftScore = 0, rightScore = 0;
let isGameOver = false; // 게임 종료 여부 확인 변수
const MAX_SPEED = 8; // 공의 최대 속도 제한

// 게임 초기화
function initializeGame() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

// 공 이동 처리
function moveBall() {
    if (isGameOver) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 공이 위아래 벽에 튕기는 처리
    if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;

    // 공이 패들에 튕기는 처리
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) {
        ballSpeedX = -ballSpeedX * 1.1; // X축 속도 증가
        ballSpeedY = ballSpeedY * 1.1; // Y축 속도 증가
    }
    if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) {
        ballSpeedX = -ballSpeedX * 1.1; // X축 속도 증가
        ballSpeedY = ballSpeedY * 1.1; // Y축 속도 증가
    }

    // 공 속도 최대치 제한
    if (Math.abs(ballSpeedX) > MAX_SPEED) ballSpeedX = ballSpeedX > 0 ? MAX_SPEED : -MAX_SPEED;
    if (Math.abs(ballSpeedY) > MAX_SPEED) ballSpeedY = ballSpeedY > 0 ? MAX_SPEED : -MAX_SPEED;

    // 공이 화면 밖으로 나간 경우 점수 증가
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

// 패들 위치 이동
function movePaddles() {
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

// 점수 업데이트
function updateScore() {
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
}

// 공 초기화 (속도 리셋)
function resetBall() {
    ballX = 390;
    ballY = 190;
    ballSpeedX = ballSpeedX > 0 ? -5 : 5; // 기본 속도로 리셋
    ballSpeedY = ballSpeedY > 0 ? -5 : 5; // 기본 속도로 리셋
}

// 우승 여부 확인
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
    winnerMessage.style.color = winner.toLowerCase(); // "Red" 또는 "Blue"에 맞는 색상
    winnerMessage.style.display = 'flex';
}

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') paddleLeftY -= paddleSpeed;
    if (e.key === 's') paddleLeftY += paddleSpeed;
    if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
    if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
});

// 모바일 컨트롤 버튼 클릭 처리
leftUpButton?.addEventListener('click', () => {
    paddleLeftY -= paddleSpeed;
    movePaddles();
});

leftDownButton?.addEventListener('click', () => {
    paddleLeftY += paddleSpeed;
    movePaddles();
});

rightUpButton?.addEventListener('click', () => {
    paddleRightY -= paddleSpeed;
    movePaddles();
});

rightDownButton?.addEventListener('click', () => {
    paddleRightY += paddleSpeed;
    movePaddles();
});

// 게임 루프
function gameLoop() {
    moveBall();
    movePaddles();
}

// 재시작 버튼 클릭 처리
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
