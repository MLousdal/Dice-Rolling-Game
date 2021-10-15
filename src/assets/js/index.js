let players = {
  player1: {
    player: 1,
    score: null,
    held: 0,
  },
  player2: {
    player: 2,
    score: null,
    held: 0,
  },
};

// Game code
const rollBtn = document.querySelector("#rollDice");
const holdBtn = document.querySelector("#hold");
const newGameBtn = document.querySelector("#newGame");

// Player variables
const player1 = players.player1;
const player1Area = document.querySelector("#player1");
const player2 = players.player2;
const player2Area = document.querySelector("#player2");

// Define player1 as default player
let currentPlayer = player1;
let ScoreEl = player1Area.querySelector("#playerScore");
let CurrentEl = player1Area.querySelector("#currentScore");
let wins = player1Area.querySelector("#wins");

function rollDice() {
  let sides = 6;
  let roll = Math.floor(Math.random() * sides) + 1;
  let score = currentPlayer.score;
  let newScore = Number(score) + Number(roll);

  // Loosing scenario
  if (roll == 1) {
    resetScore(currentPlayer.held);
    ScoreEl.classList.add("error-animation")
    setTimeout(() => {
      ScoreEl.classList.remove("error-animation")
    }, 750);
    switchPlayer();
    return;
  }

  // Winning scenario
  if (newScore >= 50) {
    wins.innerText += "🌟 ";
    rollBtn.setAttribute("disabled", "");
    holdBtn.setAttribute("disabled", "");
    newGameBtn.classList.remove("hide");
  }
  updateScore(newScore);
}

function resetScore(held) {
  ScoreEl.innerText = held;
  updateScore(held);
}

function totalResetScore() {
  let reset = 0;
  ScoreEl.innerText = reset;
  currentPlayer.held = reset;
  CurrentEl.innerText = reset;
  updateScore(reset);
}

function updateScore(newScore) {
  currentPlayer.score = newScore;
  ScoreEl.innerText = currentPlayer.score;
}

// Change the current player, and switch to their game board
function switchPlayer() {
  switch (currentPlayer.player) {
    case 1:
      currentPlayer = player2;
      ScoreEl = player2Area.querySelector("#playerScore");
      CurrentEl = player2Area.querySelector("#currentScore");
      wins = player2Area.querySelector("#wins");
      break;
    case 2:
      currentPlayer = player1;
      ScoreEl = player1Area.querySelector("#playerScore");
      CurrentEl = player1Area.querySelector("#currentScore");
      wins = player1Area.querySelector("#wins");
      break;
  }
}

function holdScore() {
  switch (currentPlayer.player) {
    case 1:
      player1.held = player1.score;
      CurrentEl.innerText = player1.held;
      break;
    case 2:
      player2.held = player2.score;
      CurrentEl.innerText = player2.held;
      break;
  }
  switchPlayer();
}

function newGame() {
  totalResetScore();
  switchPlayer();
  totalResetScore();
  switchPlayer();
  rollBtn.removeAttribute("disabled");
  holdBtn.removeAttribute("disabled");
  newGameBtn.classList.add("hide");
}

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", newGame);

// Accordion code
const acc = document.querySelectorAll(".accordion");

acc.forEach((accordion) => {
  accordion.addEventListener("click", function () {
    this.classList.toggle("active");

    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
});
