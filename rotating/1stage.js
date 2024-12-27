// 플레이어 이동 로직
const player = document.getElementById("player");
const goal = document.getElementById("goal");
const obstacle = document.getElementById("obstacle");
const walls = document.querySelectorAll(".wall");
const messageBox = document.getElementById("message-box");

let playerPosition = { x: 50, y: 500 }; // 초기 위치
const fastStep = 20; // WASD 키 이동 거리
const slowStep = 10; // 화살표 키 이동 거리

let gameOver = false; // 게임 상태 체크

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();

    if (gameOver && key === "r") {
        restartStage(); // 게임 재시작
        return;
    }

    if (gameOver) return; // 게임 오버 상태에서는 이동 불가

    // 이동 전 위치 저장
    const previousPosition = { ...playerPosition };

    // WASD 키로 빠르게 이동
    if (key === "w") playerPosition.y -= fastStep; // 위로 이동
    if (key === "s") playerPosition.y += fastStep; // 아래로 이동
    if (key === "a") playerPosition.x -= fastStep; // 왼쪽으로 이동
    if (key === "d") playerPosition.x += fastStep; // 오른쪽으로 이동

    // 화살표 키로 느리게 이동
    if (key === "ArrowUp") playerPosition.y -= slowStep; // 위로 이동
    if (key === "ArrowDown") playerPosition.y += slowStep; // 아래로 이동
    if (key === "ArrowLeft") playerPosition.x -= slowStep; // 왼쪽으로 이동
    if (key === "ArrowRight") playerPosition.x += slowStep; // 오른쪽으로 이동

    // 화면 경계 확인
    playerPosition.x = Math.max(0, Math.min(playerPosition.x, 1880));
    playerPosition.y = Math.max(0, Math.min(playerPosition.y, 1020));

    // 위치 업데이트
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;

    // 검은 선 충돌 감지
    if (Array.from(walls).some((wall) => isColliding(player, wall))) {
        playerPosition = previousPosition; // 이동을 취소
        player.style.left = `${playerPosition.x}px`;
        player.style.top = `${playerPosition.y}px`;
    }

    // 장애물 충돌 감지
    if (isColliding(player, obstacle)) {
        showGameOver(); // 게임 오버 처리
    }

    // 목표 도달 감지
    if (isColliding(player, goal)) {
        alert("Complete");
        window.location.href = "2stage.html"; // 다음 스테이지로 이동
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
    gameOver = true;
    messageBox.classList.remove("hidden"); // 메시지 박스 표시
}

// 스테이지 재시작
function restartStage() {
    gameOver = false;
    playerPosition = { x: 50, y: 500 }; // 초기 위치로 복원
    player.style.left = `${playerPosition.x}px`;
    player.style.top = `${playerPosition.y}px`;
    messageBox.classList.add("hidden"); // 메시지 박스 숨기기
}
