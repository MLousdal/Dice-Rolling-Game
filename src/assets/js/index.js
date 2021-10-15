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

const rollBtn = document.querySelector("#rollDice");
const holdBtn = document.querySelector("#hold");
const newGameBtn = document.querySelector("#newGame");

const player1 = players.player1;
const player1Area = document.querySelector("#player1");
const player2 = players.player2;
const player2Area = document.querySelector("#player2");

let currentPlayer = player1;
let ScoreEl = player1Area.querySelector("#playerScore");
let CurrentEl = player1Area.querySelector("#currentScore");

function rollDice() {
  let sides = 6;
  let roll = Math.floor(Math.random() * sides) + 1;
  let score = currentPlayer.score;
  let newScore = Number(score) + Number(roll);

  if (roll == 1) {
    let reset = 0;
    ScoreEl.innerText = reset;
    currentPlayer.held = reset;
    CurrentEl.innerText = reset;
    console.log(
      `roll: ${roll}`,
      `newScore: ${newScore}`,
      `player: ${currentPlayer.player}`
    );
    updateScore(reset);
    switchPlayer();
    return;
  }
  console.log(
    `roll: ${roll}`,
    `newScore: ${newScore}`,
    `player: ${currentPlayer.player}`
  );

  updateScore(newScore);
}

function updateScore(newScore) {
  currentPlayer.score = newScore;
  ScoreEl.innerText = currentPlayer.score;
}

function switchPlayer() {
  switch (currentPlayer.player) {
    case 1:
      currentPlayer = player2;
      ScoreEl = player2Area.querySelector("#playerScore");
      CurrentEl = player2Area.querySelector("#currentScore");
      break;
    case 2:
      currentPlayer = player1;
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

rollBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", holdScore);
