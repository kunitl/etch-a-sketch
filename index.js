// ===== GLOBAL VARIABLES AND CONFIGURATION =====
const boardSize = 480;           // Fixed pixel size for the drawing board
let numSquaresPerSide = 16;      // Number of squares per row/column (creates 16x16 grid)
let colorMode = "black";         // Current drawing mode: "black" or "randomRGB"

// ===== DOM ELEMENT SELECTION =====
const container = document.querySelector(".container");
container.style.width = `${boardSize}px`;  // Set container width to match board size

// Select control buttons
const blackButton = document.querySelector("#blackButton");
const randomRgbButton = document.querySelector("#randomRgbButton");
const resetButton = document.querySelector("#resetButton");

// ===== MAIN GRID CREATION FUNCTION =====
function createSquareDivs() {
  // Clear existing grid
  container.innerHTML = "";
  
  // Create grid squares (numSquaresPerSide²)
  for (let i = 0; i < numSquaresPerSide ** 2; i++) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    
    // Calculate and set square dimensions
    squareDiv.style.width = `${boardSize / numSquaresPerSide}px`;
    squareDiv.style.height = `${boardSize / numSquaresPerSide}px`;
    
    // Initialize custom opacity property
    squareDiv.opa = 0;
    
    // ===== MOUSE HOVER EVENT LISTENER =====
    squareDiv.addEventListener("mouseenter", () => {
      // Progressive opacity building (gets darker each hover)
      let currentOpacity = squareDiv.opa;
      if (currentOpacity < 1) {
        currentOpacity += 0.1;  // Increase opacity by 10% each hover
      }
      
      // Apply color based on current drawing mode
      if (colorMode === "black") {
        // Black mode: simple black with progressive opacity
        squareDiv.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity})`;
      } else if (colorMode === "randomRGB") {
        // Random RGB mode: generate random color once, then darken with opacity
        if (!squareDiv.randomColor) {
          // Generate random RGB values only once per square
          squareDiv.randomColor = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256),
          };
        }
        // Apply the stored random color with current opacity
        const { r, g, b } = squareDiv.randomColor;
        squareDiv.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
      }
      
      // Update stored opacity value
      squareDiv.opa = currentOpacity;
      console.log(currentOpacity);
    });

    // Add square to the container
    container.appendChild(squareDiv);
  }
}

// ===== UTILITY FUNCTION: RESET GRID APPEARANCE =====
function resetGridOpacity() {
  // Get all current squares
  const squareDivs = document.querySelectorAll(".square");
  
  // Reset each square's opacity and background
  for (const div of squareDivs) {
    div.opa = 0;                      // Reset custom opacity property
    div.style.backgroundColor = "";   // Clear background color style
  }
}

// ===== EVENT LISTENERS FOR CONTROL BUTTONS =====

// Reset button: Change grid size and recreate grid
resetButton.addEventListener("click", () => {
  let newSize;
  
  // Input validation loop
  do {
    // Prompt user for new grid size
    const input = prompt("Enter the number of squares per side (1-100):", "16");
    
    // Handle user cancellation
    if (input === null) {
      newSize = null;
      break;
    }
    
    // Validate input (check for valid number in range)
    const isNumber = !isNaN(Number(input));  // Check if entire string is numeric
    const parsedInput = parseInt(input);     // Parse the number
    
    if (isNumber && parsedInput >= 1 && parsedInput <= 100) {
      newSize = parsedInput;  // Valid input - exit loop
    } else {
      alert("Please enter a valid number between 1 and 100.");
      // Continue loop for invalid input
    }
  } while (newSize === undefined);
  
  // Apply new grid size if user didn't cancel
  if (newSize !== null) {
    numSquaresPerSide = newSize;
    colorMode = "black";          // Reset to black mode
    createSquareDivs();           // Recreate grid with new size
  }
});

// Black button: Switch to black drawing mode
blackButton.addEventListener("click", () => {
  colorMode = "black";
  resetGridOpacity();  // Clear current colors when switching modes
});

// Random RGB button: Switch to random color mode
randomRgbButton.addEventListener("click", () => {
  colorMode = "randomRGB";
  resetGridOpacity();  // Clear current colors when switching modes
});

// ===== INITIALIZATION =====
// Create initial grid when page loads
createSquareDivs();