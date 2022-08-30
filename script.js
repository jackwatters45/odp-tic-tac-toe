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
      console.log("don't forget to finish tie()");
    };

    vertical();
    horizontal();
    firstCross();
    secondCross();
    tie();
    // TODO: check for tie
  };

  // make this pretty much just functions
  let playGame = () => {
    clearScreen();
    // make two players
    // make board
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (!box.innerHTML) {
          box.innerHTML = turn;
          gameBoard.setValue(box.id, box.innerHTML);

          players.forEach((player) => {
            player.classList.toggle("glow");
          });
          checkForWinner(turn);

          if (turn == "X") {
            turn = "O";
          } else {
            turn = "X";
          }
        }
      });
    });
  };

  return { playGame };
})();

// 2. player objects - factories
const player = (name, sign) => {
  let _name = name;
  let _sign = sign;

  return { _name, _sign };
};

displayController.playGame();
