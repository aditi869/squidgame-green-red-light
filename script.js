const player = document.getElementById("player");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

const greenSound = document.getElementById("greenSound");
const redSound = document.getElementById("redSound");
const loseSound = document.getElementById("loseSound");
const winSound = document.getElementById("winSound");
const bgMusic = document.getElementById("bgMusic");

let greenLight = true;
let position = 0;
let timeLeft = 30;
let score = 0;
let timerId, lightId;

startBtn.addEventListener("click", () => {
  const nameInput = document.getElementById("playerName").value;
  document.getElementById("nameSection").style.display = "none";
  document.querySelector(".game").style.display = "block";
  startGame(nameInput || "Player");
});

document.addEventListener("keydown", onKeyDown);

function startGame(playerName) {
  clearIntervals();
  position = 0;
  timeLeft = 30;
  score = 0;
  player.style.left = "0px";
  player.innerHTML = "<div class='player-child'>👧</div>";
  player.classList.remove("losing");
  statusText.textContent = "";
  timerDisplay.textContent = timeLeft;
  scoreDisplay.textContent = "Score: 0";

  bgMusic.currentTime = 0;
  bgMusic.play();

  timerId = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) endGame(false, "Time's Up! Game Over.");
  }, 1000);

  lightId = setInterval(toggleLight, 2000);
  toggleLight();
}

function toggleLight() {
  greenLight = !greenLight;
  document.body.classList.toggle("green-light", greenLight);
  document.body.classList.toggle("red-light", !greenLight);

  if (greenLight) greenSound.play();
  else redSound.play();
}

function onKeyDown(e) {
  if (e.key !== "ArrowRight" || timeLeft <= 0) return;

  if (!greenLight) {
    endGame(false, "You Moved on Red Light! Game Over.");
  } else {
    position += 10;
    player.style.left = position + "px";
    score += 10;
    scoreDisplay.textContent = "Score: " + score;

    if (position >= document.querySelector(".game").offsetWidth - player.offsetWidth) {
      endGame(true, "You Win!");
    }
  }
}

function endGame(won, message) {
  clearIntervals();
  bgMusic.pause();
  statusText.textContent = message;

  if (won) {
    winSound.play();
    showWinEmojis();
  } else {
    player.classList.add("losing");
    loseSound.play();
    showLoseEmojis();
  }
}

function clearIntervals() {
  clearInterval(timerId);
  clearInterval(lightId);
}

function showWinEmojis() {
  const emojis = ["🎉", "😊", "🏆", "🎊", "😄"];
  for (let i = 0; i < 15; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.classList.add("emoji");
    emoji.style.left = Math.random() * 90 + "%";
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 3000);
  }
}

function showLoseEmojis() {
  const emojis = ["😢", "💔", "😭", "😞"];
  for (let i = 0; i < 15; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.classList.add("emoji");
    emoji.style.left = Math.random() * 90 + "%";
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 3000);
  }
}
