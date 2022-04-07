const container = document.querySelector('.container');
const interface = document.querySelector(".interface");
const numberChange = document.querySelector(".change-number");
const clearButton = document.querySelector(".clear-button");
const gridSpan = document.querySelector(".grid-span");
const colorPalette = document.querySelector(".color-palette");
const colorChange = document.querySelector(".change-color");
const colorSchemes = colorChange.children;
const colorOption = document.querySelectorAll("option");
const chameleonButton = document.querySelector(".chameleon-button");
const friendlyFireButton = document.querySelector(".friendly-fire");
const ffToggle = document.querySelector(".ff-toggle-on");
const shape = document.querySelectorAll(".shape");
const instructions = document.querySelector(".instructions");
let flag = false;
let color = 0;
let grey = 255;
let friendlyFire = false;
let chameleon = false;
let toggleShape = false;
let currentScheme = "default";

function createInterface() {
  let number = Math.floor(numberChange.value);
  for (let i = 0; i < number ** 2; i++) {
    const square = document.createElement("div");
    square.style.backgroundColor = "white";
    interface.style.gridTemplateColumns = `repeat(${numberChange.value}, 1fr)`;
    interface.style.gridTemplateRows = `repeat(${numberChange.value}, 1fr)`;
    interface.appendChild(square);
    document.addEventListener("mousedown", () => (flag = true));
    document.addEventListener("mouseup", () => (flag = false));
    square.addEventListener("mouseenter", colorEachSquare);
  }
}

function recalculateSquares() {
  if (numberChange.value > 100 || numberChange.value < 1) {
    numberChange.value = "";
    return;
  }
  while (interface.firstChild) {
    interface.removeChild(interface.lastChild);
  }
  gridSpan.textContent = ` x ${numberChange.value}`;
  createInterface();
}

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
      case "color-wheel":
        if (friendlyFire) {
          white == true
            ? (this.style.backgroundColor = `${colorPalette.value}`)
            : null;
        } else {
          this.style.backgroundColor = `${colorPalette.value}`;
        }
        break;
      case "random":
        chameleon
          ? [...interface.children].forEach(
              (e) =>
                (e.style.backgroundColor = `rgb(${Math.floor(
                  Math.random() * 245
                )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
                  Math.random() * 245
                )})`)
            )
          : null;
        if (friendlyFire) {
          white == true
            ? (this.style.backgroundColor = `rgb(${Math.floor(
                Math.random() * 245
              )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
                Math.random() * 245
              )})`)
            : document.body.style.backgroundColor = `rgb(${Math.floor(
              Math.random() * 245
            )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
              Math.random() * 245
            )})`;
        } else {
          this.style.backgroundColor = `rgb(${Math.floor(
            Math.random() * 245
          )}, ${Math.floor(Math.random() * 245)}, ${Math.floor(
            Math.random() * 245
          )})`;
        }
        break;
      case "rainbow":
        chameleon
          ? [...interface.children].forEach(
              (e) =>
                (e.style.backgroundColor = `hsl(${Math.floor(
                  Math.random() * 356
                )}, 100%, 50%)`)
            )
          : null;
        if (friendlyFire) {
          white == true
            ? (this.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`)
            : document.body.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`;
        } else {
          this.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`;
        }
        color++;
        break;
      case "shades-of-grey":
        chameleon
          ? [...interface.children].forEach((e) => {
              grey = Math.floor(Math.random() * 255);
              e.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
            })
          : null;
        if (friendlyFire) {
          black == true && friendlyFire == false
            ? (this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`)
            : document.body.style.backgroundColor =`rgb(${grey}, ${grey}, ${grey})`;
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

function clearInterface() {
  container.classList.add('shake');
  if (interface.firstElementChild == instructions) {
    interface.removeChild(instructions);
    createInterface();
  }
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

function changeColorScheme() {
  if (interface.firstElementChild == instructions) {
    interface.removeChild(instructions);
    createInterface();
  }
  [...colorSchemes].forEach(
    (scheme) => {
      if (scheme.style.backgroundColor = "white") {
        scheme.style.backgroundColor = "#003366";
        scheme.style.color = 'white';
      }
    });
  const interfaceSquares = document.querySelectorAll(".interface div");
  [...colorSchemes].forEach((scheme) => {
    if (scheme.value == this.value) {
      scheme.style.backgroundColor = 'white';
      scheme.style.color = '#003366';
    }
  });
  if (this.value == "shades-of-grey") {
    interfaceSquares.forEach(
      (square) => (square.style.backgroundColor = "black")
    );
    interface.style.backgroundColor = "black";
  } else {
    interface.style.backgroundColor = "white";
    interfaceSquares.forEach(
      (square) => (square.style.backgroundColor = "white")
    );
  }
  if (this.value == "color-wheel") {
    colorPalette.style.visibility = "visible";
    chameleonButton.style.textDecoration = "line-through";
    chameleonButton.style.pointerEvents = "none";
  } else {
    colorPalette.style.visibility = "hidden";
    chameleonButton.style.display = "block";
    chameleonButton.style.textDecoration = "none";
    chameleonButton.style.pointerEvents = "auto";
  }
  currentScheme = this.value;
}

function toggleFriendlyFire() {
  if (friendlyFire) {
    friendlyFireButton.textContent = "🔥";
    friendlyFireButton.style.backgroundColor = "white";
  } else {
    friendlyFireButton.textContent = "🔥";
    friendlyFireButton.style.backgroundColor = "#003366";
  }
  friendlyFire = !friendlyFire;
}

function toggleChameleon() {
  if (!chameleon) {
    chameleonButton.textContent = "🦎";
    chameleonButton.style.backgroundColor = "white";
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

function toggleDivShape() {
  const interfaceSquares = document.querySelectorAll(".interface div");
  if (toggleShape) {
    interfaceSquares.forEach((square) => (square.style.borderRadius = "50%"));
    shape.forEach((shapes) => {
      shapes.style.borderRadius = "50%";
    });
  } else {
    interfaceSquares.forEach((square) => (square.style.borderRadius = "0"));
    shape.forEach((shapes) => {
      shapes.style.borderRadius = "0";
      shapes.style.height = "86px";
      shapes.style.width = "86px";
      shapes.textContent = '';
    });
  }
  toggleShape = !toggleShape;
}

// createInterface();
numberChange.addEventListener("input", recalculateSquares);
clearButton.addEventListener("click", clearInterface);
[...colorSchemes].forEach((scheme) =>
  scheme.addEventListener("click", changeColorScheme)
);
friendlyFireButton.addEventListener("click", toggleFriendlyFire);
chameleonButton.addEventListener("click", toggleChameleon);
shape.forEach((shapes) => shapes.addEventListener("click", toggleDivShape));
