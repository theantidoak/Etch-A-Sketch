const interface = document.querySelector('.interface');
const numberChange = document.querySelector('.change-number');
const clearButton = document.querySelector('.clear-button');
const gridSize = document.querySelector('.grid-size');
const colorPalette = document.querySelector('.color-palette');
const colorChange = document.querySelector('.change-color');
const colorOption = document.querySelectorAll('option');
let flag = false;
let color = 0;
let grey = 255;
let friendlyFire = false;
const ffButton = document.querySelector('.friendly-fire');

for (let i = 0; i < numberChange.value**2; i++) {
  const square = document.createElement('div');
  square.style.backgroundColor = 'white';
  interface.style.gridTemplateColumns = `repeat(${numberChange.value}, 1fr)`;
  interface.style.gridTemplateRows = `repeat(${numberChange.value}, 1fr)`;
  interface.appendChild(square);
  document.addEventListener('mousedown', () => flag = true);
  document.addEventListener('mouseup', () => flag = false);
  square.addEventListener('mouseenter', (colorIt));
}

function calculateSquares() {
  if (numberChange.value > 100 || numberChange.value < 1) {
    numberChange.value = '';
    return;
  };
  while (interface.firstChild) {
    interface.removeChild(interface.lastChild);
  }
  gridSize.textContent = `Grid Size = ${numberChange.value}x${numberChange.value}`
  let number = Math.floor(numberChange.value);
  for (let i = 0; i < number**2; i++) {
    const square = document.createElement('div');
    square.style.backgroundColor = 'white';
    interface.style.gridTemplateColumns = `repeat(${numberChange.value}, 1fr)`;
    interface.style.gridTemplateRows = `repeat(${numberChange.value}, 1fr)`;
    interface.appendChild(square);
    document.addEventListener('mousedown', () => flag = true);
    document.addEventListener('mouseup', () => flag = false);
    square.addEventListener('mouseenter', (colorIt));
  }
}

function colorIt() {

  if (friendlyFire) {
    if (this.style.backgroundColor == 'white' && flag || this.style.backgroundColor == 'black' && colorChange.value == 'shades-of-grey' && flag) {
      if (colorChange.value == 'default') {
        this.style.backgroundColor = 'black';
      } else if (colorChange.value == 'color-wheel') {
        this.style.backgroundColor = `${colorPalette.value}`;
      } else if (colorChange.value == 'random') {
        this.style.backgroundColor = `rgb(${Math.floor(Math.random()*245)}, ${Math.floor(Math.random()*245)}, ${Math.floor(Math.random()*245)})`;
      } else if (colorChange.value == 'rainbow') {
        this.style.backgroundColor = `hsl(${color*2}, 100%, 50%)`;
      } else if (colorChange.value == 'shades-of-grey' && grey > 10) {
        this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
      }
      color++;
      grey *= .98;
      if (grey < 10 ) {
        grey = 255;
      }
    }
  } else if (flag) {
    if (colorChange.value == 'default') {
      this.style.backgroundColor = 'black';
    } else if (colorChange.value == 'color-wheel') {
      this.style.backgroundColor = `${colorPalette.value}`;
    } else if (colorChange.value == 'random') {
      this.style.backgroundColor = `rgb(${Math.floor(Math.random()*245)}, ${Math.floor(Math.random()*245)}, ${Math.floor(Math.random()*245)})`;
    } else if (colorChange.value == 'rainbow') {
      this.style.backgroundColor = `hsl(${color*2}, 100%, 50%)`;
    } else if (colorChange.value == 'shades-of-grey' && grey > 10) {
      this.style.backgroundColor = `rgb(${grey}, ${grey}, ${grey})`;
    }
    color++;
    grey *= .98;
    if (grey < 10 ) {
      grey = 255;
    }
  }
}


function clearInterface() {
  if (colorChange.value == 'shades-of-grey') {
    [...interface.children].forEach((e) => e.style.backgroundColor = 'black');
    grey = 255;
  } else {
  [...interface.children].forEach((e) => e.style.backgroundColor = 'white');
}}

function changeColorScheme() {
  const interfaceSquares = document.querySelectorAll('.interface div');
  if (this.value == 'shades-of-grey') {
    interfaceSquares.forEach((square) => square.style.backgroundColor = 'black');
  }
  if (this.value == 'color-wheel'){
    colorPalette.style.display = 'block';
  } else {
    colorPalette.style.display = 'none';
  }
}

numberChange.addEventListener('input', calculateSquares);
clearButton.addEventListener('click', clearInterface);
colorChange.addEventListener('change', changeColorScheme);
ffButton.addEventListener('click', () => friendlyFire = !friendlyFire);
