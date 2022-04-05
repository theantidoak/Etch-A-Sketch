const interface = document.querySelector('.interface');
const input = document.querySelector('input');
const clearButton = document.querySelector('.clear-button');

for (let i = 0; i < input.value**2; i++) {
  const square = document.createElement('div');
  interface.style.gridTemplateColumns = `repeat(${input.value}, 1fr)`;
  interface.style.gridTemplateRows = `repeat(${input.value}, 1fr)`;
  interface.appendChild(square);
  square.addEventListener('mouseenter', (colorIt));
}

function calculateSquares() {
  if (input.value > 100 || input.value < 1) {
    input.value = 'Try a different number';
    return;
  };
  while (interface.firstChild) {
    interface.removeChild(interface.lastChild);
  }
  let number = Math.floor(input.value);
  for (let i = 0; i < number**2; i++) {
    const square = document.createElement('div');
    interface.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    interface.style.gridTemplateRows = `repeat(${number}, 1fr)`;
    interface.appendChild(square);
    square.addEventListener('mouseenter', (colorIt));
  }
}

function colorIt() {
  this.style.backgroundColor = 'red';
}

input.addEventListener('change', calculateSquares);

