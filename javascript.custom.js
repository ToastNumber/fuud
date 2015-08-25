/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function initialise() {
    addItemSection();
    document.getElementById("btnAdd").setAttribute("onclick", "addItemSection()");
    document.getElementById("btnStart").setAttribute("onclick", "startAllTimers()");
    document.getElementById("btnReset").setAttribute("onclick", "reset()");
    document.getElementById("btnPause").setAttribute("onclick", "pauseAllTimers()");
}

function addItemSection() {
    var newItemSection = createItemSection();
    document.getElementById("main").appendChild(newItemSection);
}

function createItemSection() {
    var itemSection = document.createElement("div");
    itemSection.setAttribute("class", "itemSection");

    var nameDiv = document.createElement("div");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "name");
    nameInput.setAttribute("placeholder", "Food Item");
    nameDiv.style.display = "inline-block";
    nameDiv.appendChild(nameInput);

    //Time display
    var timeRemainingDiv = document.createElement("div");
    var timeRemainingDisplay = document.createElement("div");
    timeRemainingDisplay.setAttribute("class", "timeRemaining");
    timeRemainingDisplay.innerHTML = "--:--";
    timeRemainingDisplay.style.display = "inline-block";

    var timeRemainingInput = document.createElement("input");
    timeRemainingInput.setAttribute("type", "text");
    timeRemainingInput.setAttribute("class", "timeEditor");
    timeRemainingInput.setAttribute("placeholder", "Time (hh:mm:ss)");
    timeRemainingInput.style.display = "inline-block";
    //This should only be visible when timers are running
    var btnUpdate = document.createElement("button");
    btnUpdate.setAttribute("class", "btnUpdate");
    btnUpdate.innerHTML = "Update";
    btnUpdate.style.display = "inline-block";

    timeRemainingDiv.appendChild(timeRemainingDisplay);
    timeRemainingDiv.appendChild(timeRemainingInput);
    timeRemainingDiv.appendChild(btnUpdate);
    timeRemainingDiv.style.display = "inline-block";
    //End time display

    var btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "remove");
    btnRemove.innerHTML = "Remove";
    btnRemove.style.display = "inline-block";

    var progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progressBar");
    progressBar.style.display = "block";
    progressBar.style.height = "30px";
    progressBar.style.backgroundColor = getNextColor();

    itemSection.appendChild(nameDiv);
    itemSection.appendChild(timeRemainingDiv);
    itemSection.appendChild(btnRemove);
    itemSection.appendChild(progressBar);

    return itemSection;
}

var colors = ["Blue", "Red", "Green", "Yellow"];
var cIndex = 0;
function getNextColor() {
    var result = colors[cIndex];
    console.log(result);
    cIndex = (cIndex + 1) % colors.length;
    console.log(cIndex);
    return result;
}










