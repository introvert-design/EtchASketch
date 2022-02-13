const slider = document.querySelector('.slider');
const sliderValue = document.querySelector('.slider-value');
const sketchpad = document.querySelector('.sketchpad');

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
        let div = document.createElement('div');
        div.style.border = '1px solid #E8E9EB';
        div.classList.add(`grid-${i + 1}`)
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