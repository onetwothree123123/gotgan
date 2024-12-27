const player = document.getElementById('player');
const goal = document.getElementById('goal');
const obstacle = document.getElementById('obstacle');
const walls = document.querySelectorAll('.wall');
const messageBox = document.getElementById('message-box');

let playerX = 50; // 플레이어 초기 X 위치
let playerY = 500; // 플레이어 초기 Y 위치

let isGameOver = false; // 게임 오버 상태

// 이동 속도 설정
const speedFast = 20; // WASD 키 속도
const speedSlow = 5; // 화살표 키 속도

// 플레이어 위치 초기화
player.style.left = `${playerX}px`;
player.style.top = `${playerY}px`;

// 키 입력 이벤트
document.addEventListener('keydown', (event) => {
    if (isGameOver) {
        // 게임 오버 상태에서 R 키로 재시작
        if (event.key.toLowerCase() === 'r') {
            restartStage();
        }
        return;
    }

    // 이전 위치 저장
    const previousX = playerX;
    const previousY = playerY;

    // WASD 키로 이동
    if (event.key.toLowerCase() === 'w') playerY -= speedFast; // 위로
    if (event.key.toLowerCase() === 's') playerY += speedFast; // 아래로
    if (event.key.toLowerCase() === 'a') playerX -= speedFast; // 왼쪽
    if (event.key.toLowerCase() === 'd') playerX += speedFast; // 오른쪽

    // 화살표 키로 이동
    if (event.key === 'ArrowUp') playerY -= speedSlow; // 위로
    if (event.key === 'ArrowDown') playerY += speedSlow; // 아래로
    if (event.key === 'ArrowLeft') playerX -= speedSlow; // 왼쪽
    if (event.key === 'ArrowRight') playerX += speedSlow; // 오른쪽

    // 화면 경계 확인
    playerX = Math.max(0, Math.min(playerX, 1880)); // X축 제한
    playerY = Math.max(0, Math.min(playerY, 1020)); // Y축 제한

    // 플레이어 위치 업데이트
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    // 검은 선(벽) 충돌 확인
    if (Array.from(walls).some(wall => isColliding(player, wall))) {
        playerX = previousX;
        playerY = previousY;
        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;
    }

    // 장애물 충돌 확인
    if (isColliding(player, obstacle)) {
        showGameOver();
    }

    // 목표 도달 확인
    if (isColliding(player, goal)) {
        showComplete();
    }
});

// 충돌 감지 함수
function isColliding(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();

    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

// 게임 오버 처리
function showGameOver() {
    isGameOver = true;
    messageBox.innerHTML = `
        <div style="background: white; color: red; padding: 20px; border-radius: 10px; text-align: center;">
            <h2>Died</h2>
            <p>R을 눌러 재시작</p>
        </div>
    `;
    messageBox.style.display = 'block';
}

// 목표 도달 처리
function showComplete() {
    isGameOver = true;
    messageBox.innerHTML = `
        <div style="background: white; color: green; padding: 20px; border-radius: 10px; text-align: center;">
            <h2>Complete</h2>
            <p><button onclick="goToNextStage()" style="padding: 10px 20px; font-size: 16px; background-color: green; color: white; border: none; border-radius: 5px; cursor: pointer;">다음 스테이지로 이동</button></p>
        </div>
    `;
    messageBox.style.display = 'block';
}

// 다음 스테이지 이동
function goToNextStage() {
    window.location.href = '2stage.html'; // 다음 스테이지 파일 경로
}

// 스테이지 재시작
function restartStage() {
    isGameOver = false;
    playerX = 50; // 초기 위치로 복원
    playerY = 500;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
    messageBox.style.display = 'none';
}
