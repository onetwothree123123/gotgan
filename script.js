// DOM 요소 가져오기
const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const leftScoreElement = document.getElementById('bounce');
const rightScoreElement = document.getElementById('bounce2');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');

let ballX = 390;
let ballY = 190;
let ballSpeedX = 2;
let ballSpeedY = 2;

let paddleLeftY = 150;
let paddleRightY = 150;
let paddleSpeed = 20;

let leftScore = 0;
let rightScore = 0;

let gameInterval;

// 공 이동 함수
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 공이 벽에 닿을 때 반사
    if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;

    // 공이 패들에 맞았을 때 반사
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) ballSpeedX = -ballSpeedX;
    if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) ballSpeedX = -ballSpeedX;

    // 공이 좌우 벽에 닿을 때 점수 업데이트
    if (ballX <= 0) {
        rightScore++;
        resetBall();
        updateScore();
    }
    if (ballX >= 780) {
        leftScore++;
        resetBall();
        updateScore();
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
    ballSpeedX *= -1; // 방향 반대로
}

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') paddleLeftY -= paddleSpeed;
    if (e.key === 's') paddleLeftY += paddleSpeed;
    if (e.key === 'ArrowUp') paddleRightY -= paddleSpeed;
    if (e.key === 'ArrowDown') paddleRightY += paddleSpeed;
});

// 게임 루프
function gameLoop() {
    moveBall();
    movePaddles();
}

// 게임 시작
gameInterval = setInterval(gameLoop, 16);

// 재시작 버튼 클릭 이벤트
restartButton.addEventListener('click', () => {
    leftScore = 0;
    rightScore = 0;
    resetBall();
    updateScore();
});
