const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE



const gridParent = document.querySelector("#parent-for-grid");
const clearSketch = document.getElementById("clear-sketch-pad");
const colorPicker = document.getElementById('color-picker')
const eraser = document.getElementById('eraser')





function setCurrentColor(color) {
    currentColor = color;
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
eraser.onclick = (e) => setCurrentColor("#FFFFFF")


var gridContainer;
var colSize = 32;

clearSketch.onclick = () => reloadGrid();

// this gets the value from the slider 
var slider = document.getElementById("myRange");
// variable for where the out will be displayed 
var displayCurrentSize = document.querySelector(".display-size");

slider.oninput = function() {
    colSize = slider.value;
    console.log(colSize);
    displayCurrentSize.textContent = colSize + " x " + colSize;
    createSketchPad();
}


window.onload = function() {
    gridContainer = document.createElement('div');
    displayCurrentSize.textContent = colSize + " x " + colSize;
    createGridContainer();
    addDivs();
};


function createGridContainer() {
    var newContainer = document.createElement('div');
    newContainer.style.width = "500px";
    newContainer.style.height = "500px";
    newContainer.style.margin = "0";
    newContainer.style.padding = "0"
    newContainer.style.display = "grid";
    newContainer.style.border = "2px solid black";
    newContainer.style.setProperty('grid-template-columns', 'repeat(' + colSize + ', 1fr)');
    gridContainer = newContainer;
}


function createSketchPad() {
    // remove the old div container
    gridParent.removeChild(gridContainer);
    // // create a new grid div container with correct dimension
    createGridContainer();
    addDivs();
}

function addDivs() {
    for (var i = 0; i < colSize * colSize; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = "template-div";
        newDiv.style.height = "auto";
        newDiv.style.width = "auto";
        newDiv.style.backgroundColor = "white";
        newDiv.style.margin = 0;
        newDiv.style.padding = 0;
        newDiv.addEventListener('mouseover', changeColor)
        newDiv.addEventListener('mousedown', changeColor)
        gridContainer.appendChild(newDiv);
    }
    gridParent.append(gridContainer);
}



function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return

    e.target.style.backgroundColor = currentColor;
}

function reloadGrid() {
    createSketchPad();
}