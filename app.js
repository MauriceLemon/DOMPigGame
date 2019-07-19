/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, isPrevSix, winnerScore;
let diceDOM1 = document.querySelector('.dice1');
let diceDOM2 = document.querySelector('.dice2');

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    diceDOM1.style.display = 'block';
    diceDOM1.style.opacity = 1;
    diceDOM1.src = `dice-${dice1}.png`;

    diceDOM2.style.display = 'block';
    diceDOM2.style.opacity = 1;
    diceDOM2.src = `dice-${dice2}.png`;

    switch (true) {
      case isPrevSix :
        if (dice1 === 6 || dice2 === 6) {
          nextPlayer();
          break;
        }
      case (dice1 !== 1 && dice2 !==1):
        dice1 === 6 ? isPrevSix = true : isPrevSix = false;
        dice2 === 6 ? isPrevSix = true : isPrevSix = false;
        roundScore = roundScore + dice1 + dice2;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        break;
      default:
        isPrevSix = false;
        nextPlayer();
        break;
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    winnerScore = document.getElementById('max').value;
    isPrevSix = false;
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= winnerScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  isPrevSix === true ? scores[activePlayer] = 0 : isPrevSix;
  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
  diceDOM1.style.opacity = 0.5;
  diceDOM2.style.opacity = 0.5;
  isPrevSix = false;

  document.querySelector(`#current-${activePlayer}`).textContent = '0';

  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
};

function init() {
  document.getElementById(`name-0`).textContent = `Player 1`;
  document.getElementById(`name-1`).textContent = `Player 2`;

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  isPrevSix = false;

  diceDOM1.style.display = 'none';
  diceDOM2.style.display = 'none';

  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-0-panel`).classList.remove('winner');

  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.querySelector(`.player-1-panel`).classList.remove('winner');

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
}
