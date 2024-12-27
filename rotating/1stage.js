const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const goal = document.getElementById('goal');
const messageBox = document.getElementById('message-box');

let playerSpeedFast = 5; // WASD 이동 속도
let playerSpeedSlow = 2; // 화살표 이동 속도

// 플레이어 초기 위치
let playerX = 50;
let playerY = 200;

// 초기 상태
let isGameOver = false;

// 장애물 충돌 검사
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();

    // 장애물과 충돌
    if (
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
    ) {
        displayMessage('Died', 'red', 'R을 눌러 재시작');
        isGameOver = true;
    }

    // 목표 지점 도달
    if (
        playerRect.right > goalRect.left &&
        playerRect.left < goalRect.right &&
        playerRect.bottom > goalRect.top &&
        playerRect.top < goalRect.bottom
    ) {
        displayMessage('Complete', 'green', '다음 스테이지로 이동하세요!');
        isGameOver = true;
    }
}

// 메시지 표시 함수
function displayMessage(title, color, subtitle) {
    messageBox.innerHTML = `
        <div style="background: white; color: ${color}; padding: 20px; border-radius: 10px; text-align: center;">
            <h2>${title}</h2>
            <p>${subtitle}</p>
        </div>
    `;
    messageBox.style.display = 'block';
}

// 키보드 입력 처리
document.addEventListener('keydown', (event) => {
    if (isGameOver) {
        // 게임 오버 상태에서 R 키를 눌렀을 때 재시작
        if (event.key === 'r' || event.key === 'R') {
            window.location.reload();
        }
        return; // 게임 오버 시 움직임 비활성화
    }

    // WASD 키 이동
    if (event.key === 'w' || event.key === 'W') playerY -= playerSpeedFast;
    if (event.key === 's' || event.key === 'S') playerY += playerSpeedFast;
    if (event.key === 'a' || event.key === 'A') playerX -= playerSpeedFast;
    if (event.key === 'd' || event.key === 'D') playerX += playerSpeedFast;

    // 화살표 키 이동
    if (event.key === 'ArrowUp') playerY -= playerSpeedSlow;
    if (event.key === 'ArrowDown') playerY += playerSpeedSlow;
    if (event.key === 'ArrowLeft') playerX -= playerSpeedSlow;
    if (event.key === 'ArrowRight') playerX += playerSpeedSlow;

    // 화면 밖으로 나가지 않도록 제한
    const gameArea = document.getElementById('game-area').getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (playerX < 0) playerX = 0;
    if (playerX + playerRect.width > gameArea.width) playerX = gameArea.width - playerRect.width;
    if (playerY < 0) playerY = 0;
    if (playerY + playerRect.height > gameArea.height) playerY = gameArea.height - playerRect.height;

    // 플레이어 위치 업데이트
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    // 충돌 검사
    checkCollision();
});
