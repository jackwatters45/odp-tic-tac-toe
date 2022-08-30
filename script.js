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
  const setValue = (a, val) => {
    gameArray[a] = val;
  };
  return { getBoard, clearBoard, setValue };
})();

// object to control the flow of the game - Module
const displayController = (() => {
  let restartButton = document.querySelector("button.restart");
  let boxes = document.querySelectorAll(".box");
  let players = document.querySelectorAll(".player");
  let overlay = document.querySelector(".overlay");
  let turn = "X"; // X always starts - too bad

  // clears game when user clicks restart button
  let clearScreen = () => {
    restartButton.addEventListener("click", () => {
      boxes.forEach((box) => {
        box.innerHTML = "";
      });
      overlay.classList.add("hidden");
      gameBoard.clearBoard();
    });
  };

  // when winner found, display winner overlay
  let displayWinner = (winner) => {
    let winnerText = overlay.firstElementChild;
    winnerText.textContent = `Player ${winner} wins!`;
    overlay.classList.remove("hidden");
  };

  // when tie found, display tie overlay
  let displayTie = () => {
    let winnerText = overlay.firstElementChild;
    winnerText.textContent = `It's a tie!`;
    overlay.classList.remove("hidden");
  };

  // Check for winner -> four different ways to win and a check for tie
  let checkForWinner = (turn) => {
    let vertical = () => {
      for (let j = 0; j < 3; j++) {
        let count = 0;
        for (let i = 0 + j; i <= 6 + j; i += 3) {
          if (gameBoard.getBoard()[i] == turn) {
            count++;
          }
        }
        if (count == 3) {
          displayWinner(turn);
        }
      }
    };

    let horizontal = () => {
      for (let j = 0; j <= 6; j += 3) {
        let count = 0;
        for (let i = 0 + j; i < 3 + j; i++) {
          if (gameBoard.getBoard()[i] == turn) {
            count++;
          }
        }
        if (count == 3) {
          displayWinner(turn);
        }
      }
    };

    let firstCross = () => {
      let count = 0;
      for (let i = 0; i <= 8; i += 4) {
        if (gameBoard.getBoard()[i] == turn) {
          count++;
        }
      }
      if (count == 3) {
        displayWinner(turn);
      }
    };

    let secondCross = () => {
      let count = 0;
      for (let i = 2; i <= 6; i += 2) {
        if (gameBoard.getBoard()[i] == turn) {
          count++;
        }
      }
      if (count == 3) {
        displayWinner(turn);
      }
    };

    let tie = () => {
      let totalCount = 0;
      gameBoard.getBoard().forEach((box) => {
        if (typeof box === "string") {
          totalCount++;
        }
      });
      if (totalCount == 9) {
        displayTie();
      }
    };

    vertical();
    horizontal();
    firstCross();
    secondCross();
    tie();
  };

  // Toggles turn dispkay and changes current turn
  let togglePlayerTurn = () => {
    players.forEach((player) => {
      player.classList.toggle("glow");
    });
    if (turn == "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  };

  // Actually play the game
  let playGame = () => {
    clearScreen();
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (!box.innerHTML) {
          box.innerHTML = turn;
          gameBoard.setValue(box.id, box.innerHTML);
          checkForWinner(turn);
          togglePlayerTurn();
        }
      });
    });
  };

  return { playGame };
})();

// player objects - factories
// TODO: develop when I add the ability to add user name
const player = (name, sign) => {
  let getName = () => name;
  let getSign = () => sign;

  return { getName, getSign };
};

displayController.playGame();
