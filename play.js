const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time");
const score = document.querySelector("#score");
const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const countdownDisplay = document.querySelector("#countdown");
const contentDisplay = document.querySelector(".content");
const inputBoxDisplay = document.querySelector(".inputbox");
const submitbtn = document.querySelector(".submitbtn");
const volUp = document.querySelector("#volume");
const volMute = document.querySelector("#mutevolume");

let result = 0;
let hitPosition;
let currentTime = 20;
let dinoTimerId = null; // timer  animasi dino
let gameTimerId = null; // timer  countdown game
let countdownTimerId = null; // timer countdown sebelum game
let nickname;

document.querySelector("audio").volume = 1.0; // volume penuh

function inputcontent() {
  contentDisplay.style.display = "flex";
  inputBoxDisplay.style.display = "none";
  nickname = document.querySelector(".nickname").value;
  if (nickname === "") {
    alert("U HAVE TO ENTER YOUR NICKNAME!!!!!");
    contentDisplay.style.display = "none";
    inputBoxDisplay.style.display = "flex";
  }
}

submitbtn.addEventListener("click", inputcontent);

function volumemute() {
  document.querySelector("audio").volume = 0;
  volUp.style.display = "none";
  volMute.style.display = "flex";
}

volUp.addEventListener("click", volumemute);

function volumeOn() {
  document.querySelector("audio").volume = 1.0;
  volUp.style.display = "flex";
  volMute.style.display = "none";
}

volMute.addEventListener("click", volumeOn);

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("dino");
  });
  let randomSquare = squares[Math.floor(Math.random() * squares.length)];
  randomSquare.classList.add("dino");

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id === hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function movedino() {
  dinoTimerId = setInterval(randomSquare, 400); // timer dino pindah
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === -1) {
    clearInterval(gameTimerId);
    clearInterval(dinoTimerId);
    alert(
      "GAME OVER! Thank you for playing, " +
        nickname +
        ". Your final score is " +
        result
    );
    resetGame();
  }
}

function showCountdown() {
  clearInterval(countdownTimerId); // countdown sebelumnya berhenti
  countdownDisplay.style.display = "block"; // tampilkan elemen countdown
  let countdown = 3;

  countdownTimerId = setInterval(() => {
    if (countdown > 0) {
      countdownDisplay.textContent = countdown;
    } else if (countdown === 0) {
      countdownDisplay.textContent = "Go!"; // Tampilkan go ketika countdown selesai
    }

    countdown--;

    if (countdown < -1) {
      //  go terlihat sebelum mulai
      clearInterval(countdownTimerId);
      countdownDisplay.style.display = "none"; // sembunyikan countdown
      startGame();
    }
  }, 1000);
}

function startGame() {
  result = 0;
  score.textContent = result;
  currentTime = 20;
  timeLeft.textContent = currentTime;

  startButton.style.display = "none";
  resetButton.style.display = "block";

  clearInterval(dinoTimerId); //  tidak ada animasi dino aktif
  clearInterval(gameTimerId); //  tidak ada timer game aktif

  randomSquare();
  movedino();
  gameTimerId = setInterval(countDown, 1000); //  countdown game
}

startButton.addEventListener("click", showCountdown);

function resetGame() {
  // semua timer berhenti
  clearInterval(dinoTimerId);
  clearInterval(gameTimerId);
  clearInterval(countdownTimerId);

  countdownDisplay.textContent = ""; // reset teks countdown

  // Reset tampilan game
  squares.forEach((square) => square.classList.remove("dino"));
  result = 0;
  score.textContent = result;
  currentTime = 20;
  timeLeft.textContent = currentTime;

  countdownDisplay.style.display = "none";
  resetButton.style.display = "none";
  startButton.style.display = "block";
}

resetButton.addEventListener("click", resetGame);
