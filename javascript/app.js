const gameBoard = document.querySelector(".gameboard");
const info = document.querySelector(".info");
const btn = document.querySelector(".btn");
let movement = 0;

const startingCells = ["", "", "", "", "", "", "", "", ""];
let currrentShape = "circle";
info.innerText = "Circle's go.";

btn.addEventListener("click", refreshPage);
function createBoard() {
  startingCells.forEach((cell, index) => {
    const cellElements = document.createElement("div");
    cellElements.classList.add("square");
    cellElements.id = index;
    cellElements.addEventListener("click", addShape);
    gameBoard.append(cellElements);
  });
}
createBoard();
function addShape(e) {
  // console.log(e.target);
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(currrentShape);
  e.target.append(goDisplay);
  movement++;
  currrentShape = currrentShape === "circle" ? "cross" : "circle";
  info.innerText = `It is now ${currrentShape}'s go.`;
  e.target.removeEventListener("click", addShape);
  checkScore();
}
function checkScore() {
  const allSquares = document.querySelectorAll(".square");
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningConditions.forEach((array) => {
    const circleWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.innerText = `Circle Wins!`;
      allSquares.forEach((square) =>
        //for removing addEventListener here because that remove wont work
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningConditions.forEach((array) => {
    const crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      info.innerText = `Cross Wins!`;
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
    }
    return;
  });
  if (movement === 9) {
    info.textContent = "It's a Tie!";
  }
}
function refreshPage() {
  window.location.reload();
}
