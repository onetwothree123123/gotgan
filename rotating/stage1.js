const player = document.getElementById('player');
const goal = document.getElementById('goal');
const obstacles = document.querySelectorAll('.obstacle');

let playerX = 50;
let playerY = window.innerHeight / 2 - 15;

document.addEventListener('keydown', (e) => {
    const step = 20;

    if (e.key === 'ArrowUp') playerY -= step;
    if (e.key === 'ArrowDown') playerY += step;
    if (e.key === 'ArrowLeft') playerX -= step;
    if (e.key === 'ArrowRight') playerX += step;

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;

    checkCollisions();
    checkGoal();
});

function checkCollisions() {
    const playerRect = player.getBoundingClientRect();

    obstacles.forEach((obstacle) => {
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom
        ) {
            alert('Game Over');
            resetPlayer();
        }
    });
}

function checkGoal() {
    const playerRect = player.getBoundingClientRect();
    const goalRect = goal.getBoundingClientRect();

    if (
        playerRect.right > goalRect.left &&
        playerRect.left < goalRect.right &&
        playerRect.bottom > goalRect.top &&
        playerRect.top < goalRect.bottom
    ) {
        alert('Complete');
    }
}

function resetPlayer() {
    playerX = 50;
    playerY = window.innerHeight / 2 - 15;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
}

function goToMain() {
    window.location.href = "../index.html";
}
