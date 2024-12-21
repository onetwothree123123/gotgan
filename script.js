// DOM 요소 가져오기
const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const leftScoreElement = document.getElementById('bounce');
const rightScoreElement = document.getElementById('bounce2');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');

// 속도 조절 버튼
const speedUpButton = document.getElementById('speed-up');
const speedDownButton = document.getElementById('speed-down');

// 게임 상태 변수
let ballX = 390, ballY = 190;
let ballSpeedX = 3; // 공 초기 속도
let ballSpeedY = 3; // 공 초기 속도
let paddleLeftY = 150, paddleRightY = 150;
let paddleSpeed = 20;
let leftScore = 0, rightScore = 0;
let isGameOver = false; // 게임 종료 여부 확인 변수
let gameInterval; // 게임 루프를 관리하는 변수
const MAX_SPEED = 10; // 공 최대 속도 제한
const MIN_SPEED = 1; // 공 최소 속도 제한

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

    // 공이 벽에 튕기기
    if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;

    // 공이 패들에 튕기기
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) {
        ballSpeedX = -ballSpeedX * 1.05;
        ballSpeedY = ballSpeedY * 1.05;
    }
    if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) {
        ballSpeedX = -ballSpeedX * 1.05;
        ballSpeedY = ballSpeedY * 1.05;
    }

    // 공 속도 제한
    ballSpeedX = Math.min(MAX_SPEED, Math.max(-MAX_SPEED, ballSpeedX));
    ballSpeedY = Math.min(MAX_SPEED, Math.max(-MAX_SPEED, ballSpeedY));

    // 득점 처리
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

// 패들 이동 처리
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
    ballSpeedX = ballSpeedX > 0 ? -3 : 3; // 기본 속도로 리셋
    ballSpeedY = ballSpeedY > 0 ? -3 : 3; // 기본 속도로 리셋
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
    clearInterval(gameInterval); // 게임 루프 종료
}

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') paddleLeftY -= paddleSpeed;
    if (e.key === 's') paddleLeftY += paddleSpeed;
    if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
    if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
});

// 모바일 컨트롤 버튼 클릭 처리
document.getElementById('left-up')?.addEventListener('click', () => {
    paddleLeftY -= paddleSpeed;
    movePaddles();
});

document.getElementById('left-down')?.addEventListener('click', () => {
    paddleLeftY += paddleSpeed;
    movePaddles();
});

document.getElementById('right-up')?.addEventListener('click', () => {
    paddleRightY -= paddleSpeed;
    movePaddles();
});

document.getElementById('right-down')?.addEventListener('click', () => {
    paddleRightY += paddleSpeed;
    movePaddles();
});

// 속도 조절 버튼 기능
speedUpButton.addEventListener('click', () => {
    if (Math.abs(ballSpeedX) < MAX_SPEED) ballSpeedX *= 1.2; // 속도 증가
    if (Math.abs(ballSpeedY) < MAX_SPEED) ballSpeedY *= 1.2;
    console.log(`속도 증가: X = ${ballSpeedX.toFixed(2)}, Y = ${ballSpeedY.toFixed(2)}`);
});

speedDownButton.addEventListener('click', () => {
    if (Math.abs(ballSpeedX) > MIN_SPEED) ballSpeedX /= 1.2; // 속도 감소
    if (Math.abs(ballSpeedY) > MIN_SPEED) ballSpeedY /= 1.2;
    console.log(`속도 감소: X = ${ballSpeedX.toFixed(2)}, Y = ${ballSpeedY.toFixed(2)}`);
});

// 게임 루프
function gameLoop() {
    moveBall();
    movePaddles();
}

// 재시작 버튼 클릭 처리
restartButton.addEventListener('click', () => {
    clearInterval(gameInterval); // 기존 게임 루프 종료
    leftScore = 0;
    rightScore = 0;
    isGameOver = false;
    updateScore();
    resetBall();
    initializeGame();
    winnerMessage.style.display = 'none';
    gameInterval = setInterval(gameLoop, 16); // 새로운 게임 루프 시작
});

// 게임 시작
initializeGame();
gameInterval = setInterval(gameLoop, 16);
