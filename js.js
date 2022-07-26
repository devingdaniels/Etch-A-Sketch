const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 32;

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE
var sketchContainer = null; // stores address for the current etch-a-sketch

// tracks whether mouse is in 'clicked' position
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// gridParent is the container for the etch-a-sketch
const gridParent = document.querySelector("#parent-for-grid");
// variable that holds the reset etch-a-sketch button
const reset = document.getElementById("reset-pad");
// variable that stores the color value 
const colorPicker = document.getElementById('color-picker');
// stores the current mode of the etch-a-sketch to be eraser 
const eraser = document.getElementById('eraser');
// variable for the range slider UI button 
const rangeSlider = document.getElementById("range-slider");
// variable for updating the current dimensions of the etch-a-sketch
const sketchDimensions = document.getElementById("display-grid-dimensions");


colorPicker.oninput = (e) => setCurrentColor(e.target.value);
eraser.onclick = (e) => setCurrentColor("#FFFFFF")
reset.onclick = () => reloadGrid();
rangeSlider.oninput = () => updateDimensions();


function createSketchPad() {

    if (sketchContainer !== null) {
        // remove the old div container
        gridParent.removeChild(sketchContainer);
    }
    // // create a new grid div container with correct dimension
    var newSketchPad = document.createElement('div');
    newSketchPad.style.display = "grid";
    newSketchPad.style.width = "500px";
    newSketchPad.style.height = "500px";
    newSketchPad.style.margin = "0";
    newSketchPad.style.padding = "0"
    newSketchPad.style.border = "2px solid black";
    newSketchPad.style.setProperty('grid-template-columns', 'repeat(' + currentSize + ', 1fr) ');
    // update the sketchContainer to be the newSketchPad
    sketchContainer = newSketchPad
        // populate the new sketch container with pixels
    populateSketchPad();
}

function populateSketchPad() {
    for (var i = 0; i < currentSize * currentSize; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = "template-div";
        newDiv.style.height = "auto";
        newDiv.style.width = "auto";
        newDiv.style.backgroundColor = "white";
        newDiv.style.margin = 0;
        newDiv.style.padding = 0;
        newDiv.addEventListener('mouseover', changeColor)
        sketchContainer.appendChild(newDiv);
    }
    // Sketch container is completed, append it to its parent container
    gridParent.append(sketchContainer);
}

function updateDimensions() {
    // save the new size
    currentSize = rangeSlider.value;
    // display the new dimensions to the user
    sketchDimensions.textContent = currentSize + " x " + currentSize;
    // create the new sketch pad 
    createSketchPad();
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = currentColor;
}

function reloadGrid() {
    createSketchPad();
}

function setCurrentColor(color) {
    currentColor = color;
}

window.onload = () => {
    // display the current dimensions
    sketchDimensions.textContent = currentSize + " x " + currentSize;
    // create a new sketch pad 
    createSketchPad()
};