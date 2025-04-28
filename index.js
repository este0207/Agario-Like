const playBtn = document.querySelector("#playBtn");
const menu = document.querySelector(".menu");
const playerImg = document.querySelector("#playerImg")
const player = document.querySelector(".player")
const greeBalls = document.querySelector(".greenBalls");
const playerNameElement = document.querySelector("#playerName");
const playerNameInput = document.querySelector("#playerNameInput");

const MAXBALLS = 20;
let playerName = "";

playerNameInput.addEventListener("input", () => {
    playerName = playerNameInput.value;
    console.log(playerName);
});

playBtn.addEventListener("click", () => {
    menu.style.opacity = 0;
    setTimeout(() => {
        document.body.style.width = "400vw";
        document.body.style.height = "400vh";
        document.body.style.overflow = "scroll";
        menu.style.display = "none";
        document.body.style.backdropFilter = "brightness(1)";
        document.addEventListener("mousemove", (event) => {
            player.style.left = `${event.clientX}px`;
            player.style.top = `${event.clientY}px`;
            player.style.transform = "translate(-50%, -50%)";
        });
        playerNameElement.innerText = playerName;
    }, 1000);
})

for (let i = 0; i < MAXBALLS; i++) {
    const greenBall = document.createElement("div");
    greenBall.classList.add("greenBalls");
    greenBall.style.position = "absolute";
    greenBall.style.width = "20px";
    greenBall.style.height = "20px";
    greenBall.style.borderRadius = "50%";
    greenBall.style.backgroundColor = "green";
    greenBall.style.left = `${Math.random() * window.innerWidth}px`;
    greenBall.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(greenBall);
}

function checkCollision(player, greenBall) {
    const playerRect = player.getBoundingClientRect();
    const greenBallRect = greenBall.getBoundingClientRect();

    return !(
        playerRect.top > greenBallRect.bottom ||
        playerRect.bottom < greenBallRect.top ||
        playerRect.left > greenBallRect.right ||
        playerRect.right < greenBallRect.left
    );
}

setInterval(() => {
    const greenBalls = document.querySelectorAll(".greenBalls");
    greenBalls.forEach((greenBall) => {
        if (checkCollision(player, greenBall)) {
            const currentWidth = parseFloat(window.getComputedStyle(player).width);
            player.style.width = `${currentWidth * 1.05}px`;
            player.style.height = `${currentWidth * 1.05}px`;
            greenBall.remove(); // Remove the green ball after collision
        }
    });
}, 100);

