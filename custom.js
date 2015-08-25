/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function initialise() {
    addItemSection();
    document.getElementById("btnAdd").setAttribute("onclick", "addItemSection()");
    document.getElementById("btnStart").setAttribute("onclick", "startAllTimers()");
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
    nameDiv.appendChild(nameInput);

    var timeRemainingDiv = document.createElement("div");
    var timeRemainingDisplay = document.createElement("div");
    timeRemainingDisplay.setAttribute("class", "timeRemaining");
    timeRemainingDisplay.innerHTML = "--:--";
    var timeRemainingInput = document.createElement("input");
    timeRemainingInput.setAttribute("type", "text");
    timeRemainingInput.setAttribute("class", "timeEditor");
    timeRemainingInput.setAttribute("placeholder", "Time (hh:mm:ss)");
    //This should only be visible when timers are running
    var btnUpdate = document.createElement("button");
    btnUpdate.setAttribute("class", "btnUpdate");
    btnUpdate.innerHTML = "Update";
    timeRemainingDiv.appendChild(timeRemainingDisplay);
    timeRemainingDiv.appendChild(timeRemainingInput);
    timeRemainingDiv.appendChild(btnUpdate);

    var btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "remove");
    btnRemove.innerHTML = "Remove";

    var progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progressBar");

    itemSection.appendChild(nameDiv);
    itemSection.appendChild(timeRemainingDiv);
    itemSection.appendChild(btnRemove);
    itemSection.appendChild(progressBar);

    return itemSection;
}


