let board = new Array(9);
const players = ['x', 'o'];
let currentPlayer = players[Math.round(Math.random())];

init();

function init() {
  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', doTurn, { once: true });
    delete tile.dataset.player;
  });
}

function doTurn(e) {
  mark(e);

  if (checkWin()) {
    endGame(`${currentPlayer} wins`);
  }
  if (checkDraw()) {
    endGame('draw');
  }

  swapPlayer();
}

function mark(e) {
  const elem = e.srcElement;
  board[elem.dataset.tileId] = currentPlayer;
  elem.dataset.player = currentPlayer;
}

function swapPlayer() {
  if (currentPlayer == players[0]) {
    currentPlayer = players[1];
  } else {
    currentPlayer = players[0];
  }
}

function checkWin() {
  for (let i = 0; i < 3; i++) {
      // horizontal
    if (board[3 * i] && board[3 * i] == board[3 * i + 1] && board[3 * i + 1] == board[3 * i + 2]) {
      return true;
    }
    // vertical
    if (board[i] && board[i] == board[i + 3] && board[i + 3] == board[i + 6]) {
      return true;
    }
    // diagonal
    if (board[0] && board[0] == board[4] && board[0] == board[8]) {
      return true
    }
    if (board[2] && board[2] == board[4] && board[2] == board[6]) {
      return true
    }
  }
  return false;
}

function checkDraw() {
  if (!board.includes(undefined)) {
    return true;
  }
  return false;
}

function endGame(msg) {
  document.querySelector('.end').classList.remove('hide');
  document.querySelector('.end .title').innerText = msg;
  document.querySelector('.board').classList.add('small');
}

document.querySelector('.btn.restart').addEventListener('click', restart);

function restart() {
  document.querySelector('.end').classList.add('hide');
  document.querySelector('.board').classList.remove('small');
  board = new Array(9);
  init();
}