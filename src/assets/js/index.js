let players = {
  player1: {
    name: "Player 1",
    player: 1,
    score: null,
    held: 0,
  },
  player2: {
    name: "Player 2",
    player: 2,
    score: null,
    held: 0,
  },
};

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
let playerNameEl = player1Area.querySelector("#playerNameEl");
let ScoreEl = player1Area.querySelector("#playerScore");
let CurrentEl = player1Area.querySelector("#currentScore");

function rollDice() {
  let sides = 6;
  let roll = Math.floor(Math.random() * sides) + 1;
  let score = currentPlayer.score;
  let newScore = Number(score) + Number(roll);

  // Loosing scenario
  if (roll == 1) {
    resetScore();
    console.log(
      `roll: ${roll}`,
      `newScore: ${newScore}`,
      `player: ${currentPlayer.player}`
    );
    switchPlayer();
    return;
  }
  console.log(
    `roll: ${roll}`,
    `newScore: ${newScore}`,
    `player: ${currentPlayer.player}`
  );

  // Winning scenario
  if (newScore >= 20) {
    playerNameEl.innerText += " 🌟";
    rollBtn.setAttribute("disabled", "");
    holdBtn.setAttribute("disabled", "");
    newGameBtn.classList.remove("hide");
  }
  updateScore(newScore);
}

function resetScore() {
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
      playerNameEl = player2Area.querySelector("#playerNameEl");
      ScoreEl = player2Area.querySelector("#playerScore");
      CurrentEl = player2Area.querySelector("#currentScore");
      break;
    case 2:
      currentPlayer = player1;
      playerNameEl = player1Area.querySelector("#playerNameEl");
      ScoreEl = player1Area.querySelector("#playerScore");
      CurrentEl = player1Area.querySelector("#currentScore");
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
  playerNameEl.innerText = currentPlayer.name;
  resetScore();

  switchPlayer();
  playerNameEl.innerText = currentPlayer.name;
  resetScore();

  rollBtn.removeAttribute("disabled");
  holdBtn.removeAttribute("disabled");
  switchPlayer();
  newGameBtn.classList.add("hide");
}

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
newGameBtn.addEventListener("click", newGame);
