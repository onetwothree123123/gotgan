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
let isGameOver = false; // 게임 종료 상태를 확인하는 변수

// 초기화 함수
function initializeGame() {
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
    paddleLeft.style.top = paddleLeftY + 'px';
    paddleRight.style.top = paddleRightY + 'px';
}

// 공 이동 함수
function moveBall() {
    if (isGameOver) return; // 게임이 종료되면 공을 움직이지 않음

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 벽에 튕기기
    if (ballY <= 0 || ballY >= 380) ballSpeedY = -ballSpeedY;

    // 패들에 튕기기
    if (ballX <= 20 && ballY >= paddleLeftY && ballY <= paddleLeftY + 100) ballSpeedX = -ballSpeedX;
    if (ballX >= 760 && ballY >= paddleRightY && ballY <= paddleRightY + 100) ballSpeedX = -ballSpeedX;

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

// 우승 여부 확인
function checkWinner() {
    if (leftScore >= 5) {
        showWinner('Red'); // 왼쪽 플레이어 승리
    } else if (rightScore >= 5) {
        showWinner('Blue'); // 오른쪽 플레이어 승리
    }
}

// 우승 메시지 표시 및 게임 종료 처리
function showWinner(winner) {
    isGameOver = true; // 게임 종료 상태로 설정
    winnerMessage.textContent = `Winner: ${winner}`;
    winnerMessage.style.color = winner.toLowerCase(); // "Red" 또는 "Blue"에 맞는 색상
    winnerMessage.style.display = 'block';
    clearInterval(gameInterval); // 게임 루프 종료
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

// 게임 리셋
restartButton.addEventListener('click', () => {
    leftScore = 0;
    rightScore = 0;
    isGameOver = false; // 게임 종료 상태 해제
    updateScore();
    resetBall();
    initializeGame();
    winnerMessage.style.display = 'none';
    gameInterval = setInterval(gameLoop, 16); // 게임 루프 다시 시작
});

// 게임 시작
initializeGame();
gameInterval = setInterval(gameLoop, 16);
