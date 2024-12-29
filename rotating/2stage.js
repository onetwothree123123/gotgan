// 뒤로가기 버튼
function goToStages() {
    window.location.href = "stagess.html";
}

// 다음 스테이지 이동
function goToNextStage() {
    window.location.href = "3stage.html"; // 3스테이지로 이동
}

// 플레이어 이동 및 초기화
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const obstacleTop = document.getElementById("obstacle-top");
const obstacleBottom = document.getElementById("obstacle-bottom");
const walls = document.querySelectorAll(".wall");
const messageBox = document.getElementById("message-box");
const clearBox = document.getElementById("clear-box");

let playerPosition = { x: 50, y: 520 }; // 초기 위치
const fastStep = 20; // W, A, S, D 빠른 이동
const slowStep = 10; // 화살표키 느린 이동
let gameOver = false;

// 이동 로직
document.addEventListener("keydown", (event) => {
    if (gameOver && event.key === "r") {
        restartStage();
        return;
    }

    if (gameOver) return;

    const key = event.key;
    const previousPosition = { ...playerPosition };

    if (key === "w") playerPosition.y -= fastStep;
    if (key === "s") playerPosition.y += fastStep;
    if (key === "a") playerPosition.x -= fastStep;
    if (key === "d") playerPosition.x += fastStep;

    if (key === "ArrowUp") playerPosition.y -= slowStep;
    if (key === "ArrowDown") playerPosition.y += slowStep;
    if (key === "ArrowLeft") playerPosition.x -= slowStep;
    if (key === "ArrowRight") playerPosition.x += slowStep;

    // 화면 경계 제한
    playerPosition.x = Math.max(0, Math.min(playerPosition.x, 1880));
    playerPosition.y = Math.max(0, Math.min(playerPosition.y, 1020));

    // 위치 업데이트
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;

    // 장애물 및 벽 충돌 확인
    if (isColliding(player, obstacleTop) || isColliding(player, obstacleBottom)) {
        showGameOver();
    }

    if (Array.from(walls).some((wall) => isColliding(player, wall))) {
        playerPosition = previousPosition;
        player.style.left = `${playerPosition.x}px`;
        player.style.top = `${playerPosition.y}px`;
    }

    // 목표 도달 확인
    if (isColliding(player, goal)) {
        showClear();
    }
});

// 충돌 감지
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
    gameOver = true;
    messageBox.classList.remove("hidden");
}

// 스테이지 클리어 처리
function showClear() {
    gameOver = true;
    clearBox.classList.remove("hidden");
}

// 재시작
function restartStage() {
    gameOver = false;
    playerPosition = { x: 50, y: 520 };
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;
    messageBox.classList.add("hidden");
    clearBox.classList.add("hidden");
}
