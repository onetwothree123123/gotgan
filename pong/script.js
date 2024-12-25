// DOM 요소 가져오기
const ball = document.getElementById('ball');
const paddleLeft = document.getElementById('paddle-left');
const paddleRight = document.getElementById('paddle-right');
const leftScoreElement = document.getElementById('bounce');
const rightScoreElement = document.getElementById('bounce2');
const winnerMessage = document.getElementById('winner-message');
const speedUpButton = document.getElementById('speed-up');
const speedDownButton = document.getElementById('speed-down');

let ballX = 390;
let ballY = 190;
let ballSpeedX = 3.6;
let ballSpeedY = 3.6;

let paddleLeftY = 150;
let paddleRightY = 150;
const paddleSpeed = 20;

let leftScore = 0;
let rightScore = 0;

let gameInterval;

// 공 이동 함수
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // 공이 화면 위/아래 경계에 닿으면 튕기기
    if (ballY <= 0 || ballY >= 380) {
        ballSpeedY = -ballSpeedY;
    }

    // 공이 왼쪽 패들에 닿았을 때 반사
    if (
        ballX <= 20 &&
        ballY >= paddleLeftY &&
        ballY <= paddleLeftY + 100
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // 공이 오른쪽 패들에 닿았을 때 반사
    if (
        ballX >= 760 &&
        ballY >= paddleRightY &&
        ballY <= paddleRightY + 100
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // 공이 왼쪽 벽에 닿으면 오른쪽 점수 증가
    if (ballX <= 0) {
        rightScore++;
        updateScore();
        checkWinner();
        resetBall();
    }

    // 공이 오른쪽 벽에 닿으면 왼쪽 점수 증가
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
    paddleLeft.style.top = `${paddleLeftY}px`;
    paddleRight.style.top = `${paddleRightY}px`;
}

// 점수 업데이트 함수
function updateScore() {
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
}

// 공 초기화 함수
function resetBall() {
    ballX = 390;
    ballY = 190;
    ballSpeedX = Math.abs(ballSpeedX) * (Math.random() > 0.5 ? 1 : -1); // 랜덤 방향
    ballSpeedY = Math.abs(ballSpeedY) * (Math.random() > 0.5 ? 1 : -1);
}

// 우승자 확인 함수
function checkWinner() {
    if (leftScore >= 5) {
        displayWinner('Player Left');
    } else if (rightScore >= 5) {
        displayWinner('Player Right');
    }
}

// 우승 메시지 표시 함수
function displayWinner(winner) {
    winnerMessage.textContent = `${winner} Wins!`;
    winnerMessage.style.display = 'block';
    clearInterval(gameInterval); // 게임 종료
    document.removeEventListener('keydown', handlePaddleMovement); // 패들 제어 비활성화
}

// 키보드 입력으로 패들 움직이기
function handlePaddleMovement(event) {
    if (event.key === 'w' && paddleLeftY > 0) {
        paddleLeftY -= paddleSpeed;
    } else if (event.key === 's' && paddleLeftY < 300) {
        paddleLeftY += paddleSpeed;
    } else if (event.key === 'ArrowUp' && paddleRightY > 0) {
        paddleRightY -= paddleSpeed;
    } else if (event.key === 'ArrowDown' && paddleRightY < 300) {
        paddleRightY += paddleSpeed;
    }
}

// 모바일 컨트롤 버튼 이벤트
document.getElementById('left-up').addEventListener('click', () => {
    if (paddleLeftY > 0) paddleLeftY -= paddleSpeed;
});
document.getElementById('left-down').addEventListener('click', () => {
    if (paddleLeftY < 300) paddleLeftY += paddleSpeed;
});
document.getElementById('right-up').addEventListener('click', () => {
    if (paddleRightY > 0) paddleRightY -= paddleSpeed;
});
document.getElementById('right-down').addEventListener('click', () => {
    if (paddleRightY < 300) paddleRightY += paddleSpeed;
});

// 속도 조절 버튼 이벤트
speedUpButton.addEventListener('click', () => {
    ballSpeedX *= 1.1;
    ballSpeedY *= 1.1;
});
speedDownButton.addEventListener('click', () => {
    ballSpeedX *= 0.9;
    ballSpeedY *= 0.9;
});

// 게임 루프
function gameLoop() {
    moveBall();
    movePaddles();
}

// 게임 시작
function startGame() {
    gameInterval = setInterval(gameLoop, 16);
    document.addEventListener('keydown', handlePaddleMovement);
}

// 게임 재시작 버튼 이벤트
document.getElementById('restartButton').addEventListener('click', () => {
    leftScore = 0;
    rightScore = 0;
    updateScore();
    resetBall();
    winnerMessage.style.display = 'none';
    clearInterval(gameInterval);
    startGame();
});

// 게임 시작 호출
startGame();
