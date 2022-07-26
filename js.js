const DEFAULT_COLOR = '#000000'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 32;

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



let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)




clearSketch.onclick = () => reloadGrid();

// this gets the value from the slider 
var slider = document.getElementById("myRange");
// variable for where the out will be displayed 
var displayCurrentSize = document.querySelector(".display-size");

slider.oninput = function() {
    currentSize = slider.value;
    console.log(currentSize);
    displayCurrentSize.textContent = currentSize + " x " + currentSize;
    createSketchPad();
}

var gridContainer;
window.onload = function() {
    gridContainer = document.createElement('div');
    displayCurrentSize.textContent = currentSize + " x " + currentSize;
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
    newContainer.style.setProperty('grid-template-columns', 'repeat(' + currentSize + ', 1fr)');
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
    for (var i = 0; i < currentSize * currentSize; i++) {
        var newDiv = document.createElement('div');
        newDiv.className = "template-div";
        newDiv.style.height = "auto";
        newDiv.style.width = "auto";
        newDiv.style.backgroundColor = "white";
        newDiv.style.margin = 0;
        newDiv.style.padding = 0;
        newDiv.addEventListener('mouseover', changeColor)
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