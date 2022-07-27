const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 32;
const DEFAULT_BUTTON_COLOR = "rgb(10,89,250)";

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE


// gridParent is the container for the etch-a-sketch
const gridParent = document.querySelector("#parent-for-grid");
// variable that holds the reset etch-a-sketch button
const reset = document.getElementById("reset-pad");
// variable that stores the color value 
const colorPicker = document.getElementById('color-picker');
// variable that stores the color button toggle
const rainbowButtonToggle = document.getElementById('rainbow-toggle');

const colorButtonToggle = document.getElementById('color-toggle')
    // stores the current mode of the etch-a-sketch to be eraser 
const eraserButtonToggle = document.getElementById('eraser');
// variable for the range slider UI button 
const rangeSlider = document.getElementById("range-slider");
// variable for updating the current dimensions of the etch-a-sketch
const sketchDimensions = document.getElementById("display-grid-dimensions");


colorPicker.oninput = (e) => {
    updateCurrentMode('color');
    currentColor = e.target.value;
};
rainbowButtonToggle.onclick = () => {
    updateCurrentMode('rainbow');
}
colorButtonToggle.onclick = () => {
    updateCurrentMode('color');
}
eraserButtonToggle.onclick = () => {
    updateCurrentMode('eraser');
}
reset.onclick = () => reloadGrid();
rangeSlider.oninput = () => updateDimensions();

// variable for tracking when mouse is pressed down or not 
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createSketchPad() {

    gridParent.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
    gridParent.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;

    for (var i = 0; i < currentSize * currentSize; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList = "template-div";
        // userSelect was a two hour bug...
        newDiv.style.userSelect = "none";
        newDiv.style.margin = '0';
        newDiv.addEventListener('mouseover', changeColor)
        newDiv.addEventListener('mousedown', changeColor)
        gridParent.appendChild(newDiv);
    }
}

function updateDimensions() {
    gridParent.innerHTML = '';
    // save the new size
    currentSize = rangeSlider.value;
    // display the new dimensions to the user
    sketchDimensions.textContent = currentSize + " x " + currentSize;
    // update the current mode 
    updateCurrentMode(currentMode);
    // create the new sketch pad 
    createSketchPad();
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) {
        return;
    }
    if (currentMode === 'rainbow') {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else {
        e.target.style.backgroundColor = '#fefefe';
    }
}

function updateCurrentMode(updatedMode) {

    // update the highlighted color choice 
    if (updatedMode === 'color') {
        colorButtonToggle.style.backgroundColor = DEFAULT_BUTTON_COLOR;
        eraserButtonToggle.style.backgroundColor = "white";
        rainbowButtonToggle.style.backgroundColor = "white";
    } else if (updatedMode === 'rainbow') {
        rainbowButtonToggle.style.backgroundColor = DEFAULT_BUTTON_COLOR;
        colorButtonToggle.style.backgroundColor = "white";
        eraserButtonToggle.style.backgroundColor = "white";
    } else if (updatedMode === 'eraser') {
        eraserButtonToggle.style.backgroundColor = DEFAULT_BUTTON_COLOR;
        rainbowButtonToggle.style.backgroundColor = "white";
        colorButtonToggle.style.backgroundColor = "white";
    }

    // toggle off current mode active class 
    if (currentMode === 'color') {
        colorButtonToggle.classList.remove = 'active';
    } else if (currentColor === 'eraser') {
        eraserButtonToggle.classList.remove = 'active';
    } else if (currentMode === 'rainbow') {
        rainbowButtonToggle.classList.remove = 'active';
    }
    // update current mode and make active
    if (updatedMode === 'color') {
        colorButtonToggle.classList.add = 'active';
    } else if (updatedMode === 'eraser') {
        eraserButtonToggle.classList.add = 'active';
    } else if (updatedMode === 'rainbow') {
        rainbowButtonToggle.classList.add = 'active';
    }
    // assign updated mode 
    currentMode = updatedMode;
}

function reloadGrid() {
    // update the current mode 
    updateCurrentMode(currentMode);
    // reset the grid content
    gridParent.innerHTML = '';
    // create a new sketch
    createSketchPad();
}

window.onload = () => {
    colorButtonToggle.style.backgroundColor = DEFAULT_BUTTON_COLOR;
    // display the current dimensions
    sketchDimensions.textContent = currentSize + " x " + currentSize;
    // create a new sketch pad 
    createSketchPad();
}