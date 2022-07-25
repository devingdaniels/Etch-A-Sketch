// Parent for the etch a sketch grid container
var gridParent = document.querySelector("#grid-parent");
// This is starting grid container that is located within the parent-grid
var gridContainer;
var colSize = 16;

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
    createGridContainer();
    addDivs();
};


function createGridContainer() {
    var newContainer = document.createElement('div');
    newContainer.style.width = "500px";
    newContainer.style.height = "500px";
    newContainer.style.margin = "50px auto 0 auto";
    newContainer.style.display = "grid";
    newContainer.style.backgroundColor = "aqua";
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
        newDiv.style.backgroundColor = "blue";
        newDiv.style.margin = 0;
        newDiv.style.padding = 0;
        newDiv.style.border = ".1px solid red";
        gridContainer.appendChild(newDiv);
    }
    gridParent.append(gridContainer);
}