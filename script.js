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
  let turn = "X"; // X always starts - too bad

  // clears game when user clicks restart button --> probably gonna have to add a thing for resetting after winner
  // turn into function
  let clearScreen = restartButton.addEventListener("click", () => {
    boxes.forEach((box) => {
      box.innerHTML = "";
    });
    gameBoard.clearBoard();
  });

  // make this pretty much just functions
  let playGame = () => {
    // make two players
    // make board
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (!box.innerHTML) {
          box.innerHTML = turn;
          if (turn == "X") {
            turn = "O";
          } else {
            turn = "X";
          }
          players.forEach((player) => {
            player.classList.toggle("glow");
          });
          gameBoard.setValue(box.id, box.innerHTML);
        }
        checkForWinner();
      });
    });
  };

  // when winner found, display winner pop up
  let displayWinner = (winner) => {
    alert("Player " + winner + " wins!");
  };

  // Check for winner --> clean up with functions etc. later
  let checkForWinner = () => {
    console.log(gameBoard.getBoard());
    for (let j = 0; j < 3; j++) {
      let x = 0;
      let o = 0;
      for (let i = 0 + j; i <= 6 + j; i += 3) {
        if (gameBoard.getBoard()[i] == "X") {
          x++;
        } else if (gameBoard.getBoard()[i] == "O") {
          o++;
        }
      }
      if (x == 3) {
        displayWinner("X");
      }
      if (o == 3) {
        displayWinner("O");
      }
    }
    for (let j = 0; j <= 6; j += 3) {
      let x = 0;
      let o = 0;
      for (let i = 0 + j; i < 3 + j; i++) {
        if (gameBoard.getBoard()[i] == "X") {
          x++;
        } else if (gameBoard.getBoard()[i] == "O") {
          o++;
        }
      }
      if (x == 3) {
        console.log("x is winner");
      }
      if (o == 3) {
        console.log("o is winner");
      }
    }

    let firstCross = () => {
      let x = 0;
      let o = 0;
      for (let i = 0; i <= 8; i += 4) {
        if (gameBoard.getBoard()[i] == "X") {
          x++;
        } else if (gameBoard.getBoard()[i] == "O") {
          o++;
        }
      }
      if (x == 3) {
        console.log("x is winner");
      }
      if (o == 3) {
        console.log("o is winner");
      }
    };

    firstCross();

    let secondCross = () => {
      let x = 0;
      let o = 0;
      for (let i = 2; i <= 6; i += 2) {
        if (gameBoard.getBoard()[i] == "X") {
          x++;
        } else if (gameBoard.getBoard()[i] == "O") {
          o++;
        }
      }
      if (x == 3) {
        console.log("x is winner");
      }
      if (o == 3) {
        console.log("o is winner");
      }
    };

    secondCross();

    // TODO: check for tie 

  };

  return { playGame, clearScreen };
})();

// 2. player objects - factories
const player = (name, sign) => {
  let _name = name;
  let _sign = sign;

  return { _name, _sign };
};

displayController.playGame();
