const interface = document.querySelector(".interface");
const numberChange = document.querySelector(".change-number");
const clearButton = document.querySelector(".clear-button");
const gridSize = document.querySelector(".grid-size");
const colorPalette = document.querySelector(".color-palette");
const colorChange = document.querySelector(".change-color");
const colorOption = document.querySelectorAll("option");
let flag = false;
let color = 0;
let grey = 255;
let friendlyFire = false;
let chameleon = false;
const chameleonButton = document.querySelector('.chameleon-button');
const chameleonDiv = document.querySelector('.chameleon');
const friendlyFireButton = document.querySelector(".friendly-fire");
const ffToggle = document.querySelector(".ff-toggle-on");
const interfaceSquares = document.querySelectorAll(".interface div");
const chameleonToggle = document.querySelector('.chameleon-toggle');

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
  gridSize.textContent = `Grid Size = ${numberChange.value}x${numberChange.value}`;
  createInterface();
}

function colorEachSquare() {
  const white = this.style.backgroundColor == "white";
  const black = this.style.backgroundColor == "black";

  if (flag) {
    switch (colorChange.value) {
      case 'default':  
      if (friendlyFire) {
          white == true ? this.style.backgroundColor = 'black' : null;
        } else {
          this.style.backgroundColor = "black"; }
        break;
      case 'color-wheel':
        if (friendlyFire) {
          white == true ? this.style.backgroundColor = `${colorPalette.value}` : null;
        } else {
          this.style.backgroundColor = `${colorPalette.value}`; }
        break;
      case 'random': 
        chameleon ? [...interface.children].forEach((e) => e.style.backgroundColor = `rgb(${Math.floor(Math.random() * 245)}, ${Math.floor(Math.random() * 245)}, ${Math.floor(Math.random() * 245)})`) : null;
        if (friendlyFire) {
          white == true ? this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 245)}, ${Math.floor(Math.random() * 245)}, ${Math.floor(Math.random() * 245)})` : null;
        } else {
          this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 245)}, ${Math.floor(Math.random() * 245)}, ${Math.floor(Math.random() * 245)})`; }
        break;
      case 'rainbow': 
        chameleon ? [...interface.children].forEach((e) => (e.style.backgroundColor = `hsl(${Math.floor(Math.random()*356)}, 100%, 50%)`)) : null;
        if (friendlyFire) {
          white == true ? this.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)` : null;
        } else {
          this.style.backgroundColor = `hsl(${color * 2}, 100%, 50%)`; }
        break;
      case 'shades-of-grey':
        chameleon ? [...interface.children].forEach((e) => {
          grey = Math.floor(Math.random()*255);
          (e.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`)}) : null;
        if (friendlyFire) { 
            black == true ? this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})` : null;
          } else {
            this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`; }
          break;
      }
    color++;
    grey *= 0.98;
    if (grey < 10) {
      grey = 255;
    }
  }
}

function clearInterface() {
  if (colorChange.value == "shades-of-grey") {
    [...interface.children].forEach((e) => (e.style.backgroundColor = "black"));
    grey = 255;
  } else {
    [...interface.children].forEach((e) => (e.style.backgroundColor = "white"));
  }
}

function changeColorScheme() {
  this.value == "shades-of-grey" 
  ? interfaceSquares.forEach((square) => (square.style.backgroundColor = "black")) : null;
  this.value == "color-wheel" ? colorPalette.style.display = "block" 
  : colorPalette.style.display = "none";
  this.value == "rainbow" || this.value == "random" || this.value == "shades-of-grey" 
  ? chameleonDiv.style.display = "block" : chameleonDiv.style.display = "none"; 
}

function toggleFriendlyFire() {
  if (friendlyFire) {
    ffToggle.textContent = "On";
  } else {
    ffToggle.textContent = "Off";
  }
  friendlyFire = !friendlyFire;
};

function toggleChameleon() {
  if (!chameleon) {
    chameleonToggle.textContent = 'On';
  } else {
    chameleonToggle.textContent = 'Off';
  }
  chameleon = !chameleon;
}

createInterface();
numberChange.addEventListener("input", recalculateSquares);
clearButton.addEventListener("click", clearInterface);
colorChange.addEventListener("change", changeColorScheme);
friendlyFireButton.addEventListener("click", toggleFriendlyFire);
chameleonButton.addEventListener("click", toggleChameleon);
  
