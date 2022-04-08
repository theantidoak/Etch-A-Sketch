const container = document.querySelector('.container');
const interface = document.querySelector(".interface");
const numberInput = document.querySelector(".number-input");
const resetButton = document.querySelector(".reset-button");
const numberSpan = document.querySelector(".number-span");
const colorWheel = document.querySelector(".color-wheel");
const colorSchemes = document.querySelector(".color-schemes").children;
const friendlyFireButton = document.querySelector(".friendly-fire");
const chameleonButton = document.querySelector(".chameleon-button");
const tileShape = document.querySelector(".tile-shape");
let color = 0;
let grey = 255;
let flag = false;
let friendlyFire = false;
let chameleon = false;
let toggleShape = false;
let currentScheme = "default";

// Create tiles for the interface
function createInterface() {
  let number = Math.floor(numberInput.value);
  for (let i = 0; i < number ** 2; i++) {
    const square = document.createElement("div");
    if (currentScheme == "shades-of-grey") {
      square.style.backgroundColor = 'black';
      grey = 255;
    } else {
      square.style.backgroundColor = "white";
    }
    interface.style.gridTemplateColumns = `repeat(${numberInput.value}, 1fr)`;
    interface.style.gridTemplateRows = `repeat(${numberInput.value}, 1fr)`;
    interface.appendChild(square);
    square.addEventListener("mousedown", colorEachSquare);
    square.addEventListener("mouseenter", colorEachSquare);
  }
}

// Recreate the tiles when the input is used
function recalculateSquares() {

  if (numberInput.value > 100 || numberInput.value < 1) {
    numberInput.value = "";
    return;
  }
  while (interface.firstChild) {
    interface.removeChild(interface.lastChild);
  }
  numberSpan.textContent = `${numberInput.value}x${numberInput.value}`;
  createInterface();
}

// Based on the color scheme, friendly-fire, & chameleon, add background color to the tiles
function colorEachSquare() {
  const white = this.style.backgroundColor == "white";
  const black = this.style.backgroundColor == "black";

  if (flag) {
    switch (currentScheme) {
      case "default":
        if (friendlyFire) {
          white == true ? (this.style.backgroundColor = "black") : null;
        } else {
          this.style.backgroundColor = "black";
        }
        break;
      case "color-palette":
        if (friendlyFire) {
          white == true
            ? (this.style.backgroundColor = `${colorWheel.value}`)
            : null;
        } else {
          this.style.backgroundColor = `${colorWheel.value}`;
        }
        break;
      case "random":
        if (friendlyFire && chameleon) {
          [...interface.children].forEach(
            (e) =>
              (e.style.backgroundColor = `rgb(${Math.floor(
                Math.random() * 245
              )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
                Math.random() * 245
              )})`)
          )
          document.body.style.backgroundColor = `rgb(${Math.floor(
            Math.random() * 245
          )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
            Math.random() * 245
          )})`;    
        } else if (chameleon) {
          [...interface.children].forEach(
            (e) =>
              (e.style.backgroundColor = `rgb(${Math.floor(
                Math.random() * 245
              )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
                Math.random() * 245
              )})`)
          )
        } else if (friendlyFire) {
          white == true
            ? (this.style.backgroundColor = `rgb(${Math.floor(
                Math.random() * 245
              )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
                Math.random() * 245
              )})`)
            : null;
        } else {
          this.style.backgroundColor = `rgb(${Math.floor(
            Math.random() * 245
          )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
            Math.random() * 245
          )})`;
        }
        break;
      case "rainbow":
        if (friendlyFire && chameleon) {
          [...interface.children].forEach(
            (e) =>
              (e.style.backgroundColor = `hsl(${Math.floor(
                Math.random() * 356
              )}, 100%, 50%)`)
          );
          document.body.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`;
        } else if (chameleon) {
          [...interface.children].forEach(
            (e) =>
              (e.style.backgroundColor = `hsl(${Math.floor(
                Math.random() * 356
              )}, 100%, 50%)`)
          );
        } else if (friendlyFire) {
          white == true
            ? (this.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`)
            : null;
        } else {
          this.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`;
        }
        color++;
        break;
      case "shades-of-grey":
        if (friendlyFire && chameleon) {
          [...interface.children].forEach((e) => {
            grey = Math.floor(Math.random() * 255);
            e.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
          });
          document.body.style.backgroundColor =`rgb(${grey}, ${grey}, ${grey})`;
        } else if (chameleon){
          [...interface.children].forEach((e) => {
            grey = Math.floor(Math.random() * 255);
            e.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
          });
        } else if (friendlyFire) {
          black == true
            ? (this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`)
            : null;
        } else {
          this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
        }
        grey *= 0.98;
        if (grey < 10) {
          grey = 255;
        }
        break;
    }
  }
}

// Clear the interface and recreate the tiles while shaking
function clearInterface() {
  container.classList.add('shake');
  if (currentScheme == "shades-of-grey") {
    [...interface.children].forEach((e) => (e.style.backgroundColor = "black"));
    interface.style.backgroundColor = "black";
    grey = 255;
  } else {
    [...interface.children].forEach((e) => (e.style.backgroundColor = "white"));
  }
  setTimeout(() => container.classList.remove('shake'), 80);
  setTimeout(() => container.classList.add('shake'), 160);
  setTimeout(() => container.classList.remove('shake'), 240);
}

// Re-color the color scheme buttons and adjust the color scheme values
function changeColorScheme() {
  [...colorSchemes].forEach((scheme) => {
      if (scheme.style.backgroundColor = "skyblue") {
        scheme.style.backgroundColor = "#003366";
        scheme.style.color = 'skyblue';
      }
      if (scheme.value == this.value) {
        scheme.style.backgroundColor = 'skyblue';
        scheme.style.color = '#003366';
      }
    });

  const interfaceSquares = document.querySelectorAll(".interface div");
  if (this.value == "shades-of-grey") {
    interfaceSquares.forEach((square) => (square.style.backgroundColor = "black"));
    interface.style.backgroundColor = "black";
  } else {
    interface.style.backgroundColor = "white";
    interfaceSquares.forEach(
      (square) => (square.style.backgroundColor = "white")
    );
  }

  if (this.value == "color-palette") {
    colorWheel.style.visibility = "visible";
    chameleonButton.style.textDecoration = "line-through";
    chameleonButton.style.pointerEvents = "none";
  } else {
    colorWheel.style.visibility = "hidden";
    chameleonButton.style.display = "block";
    chameleonButton.style.textDecoration = "none";
    chameleonButton.style.pointerEvents = "auto";
  }
  currentScheme = this.value;
}

// Toggle Friendly-fire: Color over all tiles vs. color over black/white tiles only
function toggleFriendlyFire() {
  if (friendlyFire) {
    friendlyFireButton.textContent = "🔥";
    friendlyFireButton.style.backgroundColor = "skyblue";
  } else {
    friendlyFireButton.textContent = "🔥";
    friendlyFireButton.style.backgroundColor = "#003366";
  }
  friendlyFire = !friendlyFire;
}

// Toggle Chameleon: Party!
function toggleChameleon() {
  if (!chameleon) {
    chameleonButton.textContent = "🦎";
    chameleonButton.style.backgroundColor = "skyblue";
  } else {
    chameleonButton.textContent = "🦎";
    chameleonButton.style.backgroundColor = "#003366";
  }
  if (currentScheme == "shades-of-grey") {
    [...interface.children].forEach((e) => (e.style.backgroundColor = "black"));
    interface.style.backgroundColor = "black";
    grey = 255;
  } else {
    [...interface.children].forEach((e) => (e.style.backgroundColor = "white"));
  }
  chameleon = !chameleon;
}

// Toggle the shape of the tiles and the tile button
function toggleDivShape() {
  const interfaceSquares = document.querySelectorAll(".interface div");
  if (toggleShape) {
    interfaceSquares.forEach((square) => (square.style.borderRadius = "50%"));
    tileShape.style.borderRadius = "50%";
  } else {
    interfaceSquares.forEach((square) => (square.style.borderRadius = "0"));
    tileShape.style.borderRadius = "0";
    tileShape.style.height = "80px";
    tileShape.style.width = "80px";
    tileShape.textContent = '';
  }
  toggleShape = !toggleShape;
}

document.body.addEventListener("drop", (e) => e.preventDefault());
document.body.addEventListener("dragstart", (e) => e.preventDefault());
document.body.addEventListener("mousedown", () => (flag = true));
document.body.addEventListener("mouseup", () => (flag = false));
createInterface();
numberInput.addEventListener("input", recalculateSquares);
numberInput.addEventListener('change', recalculateSquares)
resetButton.addEventListener("click", clearInterface);
[...colorSchemes].forEach((scheme) =>
scheme.addEventListener("click", changeColorScheme));
friendlyFireButton.addEventListener("click", toggleFriendlyFire);
chameleonButton.addEventListener("click", toggleChameleon);
tileShape.addEventListener("click", toggleDivShape);

