const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');
const sketchpad = document.querySelector('.sketchpad');
const sketchBtns = document.querySelectorAll('.sketch-btn');
const clearBtn = document.querySelector('.clear-btn');
const colorPicker = document.querySelector('#color-picker');

function displayGridValue(gridValue) {
    sliderValue.textContent = `${gridValue} x ${gridValue}`;
}

function removeChilds(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function setGridColor(elt, backgroundColor='', borderColor='#E8E9EB', opacity='') {
    if (backgroundColor === '') {
        elt.style.removeProperty('background-color');
    }
    else {
        elt.style.backgroundColor = backgroundColor;
    }    
    elt.style.border = `1px solid ${borderColor}`;
    if (opacity === '') {
        elt.style.removeProperty('opacity');
    }
    else {
        elt.style.opacity = opacity;
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
        setGridColor(div);
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

let gridValue = slider.value;
configSketchpad(gridValue);

slider.addEventListener('change', changeGrid);

let isReady = false;
let selectedOption = 'color';

function clearGrid() {
    const children = sketchpad.childNodes;
    children.forEach(child => {
        if (child.style.backgroundColor !== '') {
            setGridColor(child)
        }
    });
}

function removeClass(selector, className) {
    const elt = document.querySelector(selector);
    elt.classList.remove(className);
}

function selectOption(e) {
    const selector = `button[value="${selectedOption}"]`;
    removeClass(selector, 'active');    
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

function sketch(e) {
    if (isReady && e.target.className !== 'sketchpad') {
        let color = '';
        if (selectedOption === 'color') {
            color = colorPicker.value;
            setGridColor(e.target, color, color);
        } 
        else if (selectedOption === 'rainbow') {
            color = getRandomColor(); 
            setGridColor(e.target, color, color);
        }
        else if (selectedOption === 'shading') {
            color = 'black';
            let opacity = Number(e.target.style.opacity);
            opacity = opacity < 1 ? opacity + 0.1 : 1;
            setGridColor(e.target, color, color, opacity);
        }
        else if (selectedOption === 'eraser') {
            setGridColor(e.target);
        }            
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
sketchBtns.forEach(button => button.addEventListener('click', selectOption));
clearBtn.addEventListener('click', clearGrid);