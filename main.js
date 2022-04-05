const interface = document.querySelector('.interface');
const numberChange = document.querySelector('.change-number');
const clearButton = document.querySelector('.clear-button');
const gridSize = document.querySelector('.grid-size');
const colorPalette = document.querySelector('.color-palette');
const colorChange = document.querySelector('.change-color');

console.log(colorPalette.value);

for (let i = 0; i < numberChange.value**2; i++) {
  const square = document.createElement('div');
  interface.style.gridTemplateColumns = `repeat(${numberChange.value}, 1fr)`;
  interface.style.gridTemplateRows = `repeat(${numberChange.value}, 1fr)`;
  interface.appendChild(square);
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
    interface.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    interface.style.gridTemplateRows = `repeat(${number}, 1fr)`;
    interface.appendChild(square);
    square.addEventListener('mouseenter', (colorIt));
  }
}

function colorIt() {
  this.style.backgroundColor = `${colorPalette.value}`;
}

function clearInterface() {
  [...interface.children].forEach((e) => e.style.backgroundColor = 'white');
}

function changeColor() {
  if (this.value == 'color-wheel'){
    colorPalette.style.display = 'block';
  } else {
    colorPalette.style.display = 'none';
  }
}

numberChange.addEventListener('input', calculateSquares);
clearButton.addEventListener('click', clearInterface);
colorChange.addEventListener('change', changeColor);
