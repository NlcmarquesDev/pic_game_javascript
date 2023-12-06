"use strict";
//btns
const newGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdPoints = document.querySelector(".btn--hold");

//section
let image = document.querySelector(".dice");
let activeStylePlayer0 = document.querySelector(".player--0");
let activeStylePlayer1 = document.querySelector(".player--1");

//variables
let activePlayer = 0;
const scoreTotal = [0, 0];
let currentScore = 0;

//starting conditions
image.classList.add("hidden");
activeStylePlayer0.classList.add("player--active");
document.querySelector(`#score--0`).textContent = 0;
document.querySelector(`#score--1`).textContent = 0;
document.querySelector(`#current--0`).textContent = 0;
document.querySelector(`#current--1`).textContent = 0;

//event listeners
newGame.addEventListener("click", restart);
rollDice.addEventListener("click", handleDice);
holdPoints.addEventListener("click", holdPoint);

//Functions
function restart() {
  image.classList.add("hidden");
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  activeStylePlayer0.classList.add("player--active");
  activeStylePlayer1.classList.toggle("player--active");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  currentScore = 0;
  scoreTotal[0] = 0;
  scoreTotal[1] = 0;
  activePlayer = 0;
  rollDice.disabled = false;
  holdPoints.disabled = false;
}

function handleDice() {
  const dice = Math.floor(Math.random() * 6 + 1);
  image.classList.remove("hidden");
  image.setAttribute("src", "dice-" + dice + ".png");

  //checkar se chegou aos 100 pontos

  if (dice === 1) {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    //zerar o valor do current
    currentScore = 0;
    //alterar para o outro jogador
    activePlayer = activePlayer === 0 ? 1 : 0;
    activeStylePlayer0.classList.toggle("player--active");
    activeStylePlayer1.classList.toggle("player--active");
  } else {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  }
}

function holdPoint() {
  scoreTotal[activePlayer] += currentScore;
  if (scoreTotal[activePlayer] > 99) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");

    rollDice.disabled = true;
    holdPoints.disabled = true;
  }
  currentScore = 0;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scoreTotal[activePlayer];
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
}
