// use as little global code possible - store in module or factor when possible

// Gameboard object - Module
// Gonna have to change to 2 grid array for maths
const gameBoard = (() => {
  // store gameboard as an array inside a gameboard object
  //   let gameArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8],];
  let gameArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const getBoard = () => {
    console.log(gameArray);
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

//
//
// Dumb Scratch
// object to control the flow of the game - Module
let restartButton = document.querySelector("button.restart");
let playerArea = document.querySelector(".players");
let boxes = document.querySelectorAll(".box");
let players = document.querySelectorAll(".player");

//   const displayController = () => {
let clearScreen = restartButton.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
  });
  gameBoard.clearBoard();
  gameBoard.getBoard();
});

let turn = "X";
let addToBox = boxes.forEach((box) => {
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
    gameBoard.getBoard();
  });
});
//   };

//
//
//
// 2. player objects - factories
const player = (name, sign) => {
  let _name = name;
  let _sign = sign;

  //   const setSign = () => {
  //     let boxes = document.querySelectorAll(".box");
  //     boxes.forEach((box) => {
  //       box.addEventListener("click", function selectBox() {
  //         alert("yowza");
  //       });
  //     });
  //   };
  return { _name, _sign };
};

//
//
//

// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.
const gameOver = function () {};
// })();
