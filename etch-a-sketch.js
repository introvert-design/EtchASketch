const colorBtn = document.querySelector('.color-btn');
const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');
const sketchpad = document.querySelector('.sketchpad');
const buttons = document.querySelectorAll('button');

function displayGridValue(gridValue) {
    sliderValue.textContent = `${gridValue} x ${gridValue}`;
}

function removeChilds(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function drawGridLines(gridValue) {
    sketchpad.setAttribute(
        'style',
        `display: grid; ` +
        `grid-template-rows: repeat(${gridValue}, 1fr); ` +
        `grid-template-columns: repeat(${gridValue}, 1fr);`
    )
    for (let i = 0; i < gridValue ** 2; i++) {
        const div = document.createElement('div');
        div.style.border = '1px solid #E8E9EB';
        div.classList.add(`grid-${i}`)
        sketchpad.appendChild(div);
    }
}

function configSketchpad(gridValue) {
    displayGridValue(gridValue);
    drawGridLines(gridValue);
}

function changeGrid(e) {
    gridValue = e.target.value;
    removeChilds(sketchpad);
    configSketchpad(gridValue);    
}

const initialGridValue = slider.value;
configSketchpad(initialGridValue);

slider.addEventListener('change', changeGrid);

let isReady = false;
let selectedOption = 'color';

function selectOption(e) {
    const previousSelectedbutton = document.querySelector(`button[value="${selectedOption}"]`);
    previousSelectedbutton.classList.remove('active');
    selectedOption = e.target.value;
    e.target.classList.add('active');
}

function randomColorCode() {
    return Math.floor(Math.random() * 256);
}

function getRandomColor() {
    let colorCodes = [];
    for (let i = 0; i < 3; i++) {
        colorCodes.push(randomColorCode());
    }
    return `rgba(${colorCodes.join(',')})`;
}

function getColor() {
    if (selectedOption === 'color') {
        return;
    }
    else if (selectedOption === 'rainbow') {
        return getRandomColor();
    }
}

function sketch(e) {
    if (isReady && e.target.className !== 'sketchpad') {
        e.target.style.backgroundColor = `${getColor()}`;
        // e.target.style.borderColor = 'rgba(0, 0, 0, 0.3)';
    }    
}

function startSketch(e) {
    isReady = true;
    sketch(e);
}

function stopSketch() {
    isReady = false;
}

sketchpad.addEventListener('dragstart', stopSketch);
sketchpad.addEventListener('mouseup', stopSketch);
sketchpad.addEventListener('mousedown', startSketch);
sketchpad.addEventListener('mouseover', sketch);
buttons.forEach(button => button.addEventListener('click', selectOption));