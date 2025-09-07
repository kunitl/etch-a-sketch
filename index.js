const boardSize = 480;
let numSquaresPerSide = 16;

const container = document.querySelector(".container");
container.style.width = `${boardSize}px`;

function createSquareDivs() {
  for (let i = 0; i < numSquaresPerSide ** 2; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.style.width = `${boardSize / numSquaresPerSide}px`;
    squareDiv.style.height = `${boardSize / numSquaresPerSide}px`;
    squareDiv.addEventListener("mouseenter", () => squareDiv.classList.add("bgColor"));
    container.appendChild(squareDiv);
  }
}

const reset = document.querySelector("#reset");

reset.addEventListener("click", () => {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  while (true) {
    let input = prompt(
      "Enter the number of squares per side (max 100).\nPress 'Cancel' to use the default value: 16.",
      "16"
    );
    if (input === null) {
      numSquaresPerSide = 16;
      break;
    } else if (isNaN(input) || parseInt(input) > 100) {
      alert("Please enter a number with maximum of 100");
      continue;
    } else {
      numSquaresPerSide = parseInt(input);
      break;
    }
  }
  createSquareDivs();
});

createSquareDivs();