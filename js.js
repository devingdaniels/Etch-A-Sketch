// Parent for the etch a sketch grid container
const gridParent = document.querySelector("#parent-for-grid");
const clearSketch = document.getElementById("clear-sketch-pad");
const currentColor = document.getElementsByClassName('color-picker')
    // This is starting grid container that is located within the parent-grid



// var userColor = currentColor.type.value;
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
    newContainer.style.backgroundColor = "aqua";
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
        gridContainer.appendChild(newDiv);
    }
    gridParent.append(gridContainer);
}


function changeColor(e) {
    e.target.style.backgroundColor = "black";
}

function reloadGrid() {
    console.log('reload grid pressed')
    clearGrid()
}

function clearGrid() {
    createSketchPad();
}