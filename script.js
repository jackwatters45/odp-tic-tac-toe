// Gameboard object - Module
const gameBoard = (() => {
  // store gameboard as an array inside a gameboard object
  let gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const getBoard = () => {
    return gameArray;
  };
  const clearBoard = () => {
    gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  };
  const setValue = (cell, val) => {
    gameArray[cell] = val;
  };
  return { getBoard, clearBoard, setValue };
})();

// object to control the flow of the game - Module
const displayController = (() => {
  const restartButton = document.querySelector('button.restart');
  const boxes = document.querySelectorAll('.box');
  const players = document.querySelectorAll('.player');
  const overlay = document.querySelector('.overlay');
  let turn = 'X';

  // clears game when user clicks restart button
  const clearScreen = () => {
    restartButton.addEventListener('click', () => {
      boxes.forEach((box) => (box.innerHTML = ''));
      overlay.classList.add('hidden');
      gameBoard.clearBoard();
    });
  };

  // when winner found, display winner overlay
  const displayWinner = (winner) => {
    let winnerText = overlay.firstElementChild;
    winnerText.textContent = `Player ${winner} wins!`;
    overlay.classList.remove('hidden');
  };

  // when tie found, display tie overlay
  const displayTie = () => {
    const winnerText = overlay.firstElementChild;
    winnerText.textContent = `It's a tie!`;
    overlay.classList.remove('hidden');
  };

  // Check for winner -> four different ways to win and a check for tie
  const checkForWinner = (turn) => {
    const currentBoard = gameBoard.getBoard();
    const vertical = () => {
      for (let j = 0; j < 3; j += 1) {
        let count = 0;
        for (let i = 0 + j; i <= 6 + j; i += 3) {
          if (currentBoard[i] === turn) count++;
        }
        if (count === 3) displayWinner(turn);
      }
    };
    vertical();

    const horizontal = () => {
      for (let j = 0; j <= 6; j += 3) {
        let count = 0;
        for (let i = 0 + j; i < 3 + j; i += 1) {
          if (currentBoard[i] === turn) count++;
        }
        if (count === 3) displayWinner(turn);
      }
    };
    horizontal();

    const firstCross = () => {
      let count = 0;
      for (let i = 0; i <= 8; i += 4) {
        if (currentBoard[i] === turn) count++;
      }
      if (count === 3) displayWinner(turn);
    };
    firstCross();

    const secondCross = () => {
      let count = 0;
      for (let i = 2; i <= 6; i += 2) {
        if (currentBoard[i] === turn) count++;
      }
      if (count === 3) displayWinner(turn);
    };
    secondCross();

    const tie = () => {
      if (currentBoard.filter((box) => typeof box === 'string').length === 9)
        displayTie();
    };
    tie();
  };

  // Toggles turn display and changes current turn
  const togglePlayerTurn = () => {
    players.forEach((player) => player.classList.toggle('glow'));
    turn = turn === 'X' ? 'O' : 'X';
  };

  // Actually play the game
  const playGame = () => {
    clearScreen();
    boxes.forEach((box) => {
      box.addEventListener('click', () => {
        if (box.innerHTML) return;
        box.innerHTML = turn;
        gameBoard.setValue(box.id, turn);
        checkForWinner(turn);
        togglePlayerTurn();
      });
    });
  };

  return { playGame };
})();

displayController.playGame();
