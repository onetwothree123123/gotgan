const player = document.getElementById('player');
const goal = document.getElementById('goal');
const obstacles = document.querySelectorAll('.obstacle');
const walls = document.querySelectorAll('.wall');

let playerX = 50;
let playerY = 500;
let isGameOver = false;

const fastSpeed = 20; // WASD 속도
const slowSpeed = 5; // 화살표 속도

document.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    const prevX = playerX;
    const prevY = playerY;

    // WASD 키 이동
    if (event.key.toLowerCase() === 'w') playerY -= fastSpeed;
    if (event.key.toLowerCase() === 's') playerY += fastSpeed;
    if (event.key.toLowerCase() === 'a') playerX -= fastSpeed;
    if (event.key.toLowerCase() === 'd') playerX += fastSpeed;

    // 화살표 키 이동
    if (event.key === 'ArrowUp') playerY -= slowSpeed;
    if (event.key === 'ArrowDown') playerY += slowSpeed;
    if (event.key === 'ArrowLeft') playerX -= slowSpeed;
    if (event.key === 'ArrowRight') playerX += slowSpeed;

    // 벽에 닿았을 때
    if (Array.from(walls).some(wall => isColliding(player, wall))) {
        playerX = prevX;
        playerY = prevY;
    }

    // 위치 업데이트
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    // 장애물 충돌 감지
    if (Array.from(obstacles).some(obstacle => isColliding(player, obstacle))) {
        alert('Died');
        restartStage();
    }

    // 목표 도달 감지
    if (isColliding(player, goal)) {
        alert('Complete');
        window.location.href = '3stage.html';
    }
});

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

function restartStage() {
    playerX = 50;
    playerY = 500;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
}
