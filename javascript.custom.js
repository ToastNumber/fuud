/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function initialise() {
    addItemSection();
    document.getElementById("btnAdd").setAttribute("onclick", "addItemSection()");
    document.getElementById("btnStart").setAttribute("onclick", "startAllTimers()");
    document.getElementById("btnStop").setAttribute("onclick", "stopAllTimers(true)");
    document.getElementById("btnPause").setAttribute("onclick", "stopAllTimers(false)");

    //Initially hide the pause button - use css in future
    document.getElementById("btnPause").style.display = "none";
}

function updateControlDisplay() {
    var btnPause = document.getElementById("btnPause");
    var btnStart = document.getElementById("btnStart");
    var btnAdd = document.getElementById("btnAdd");
    var removeButtons = document.getElementsByClassName("remove");
    var systemState = getSystemState();

    btnStart.style.display = "none";
    btnPause.style.display = "none";
    btnAdd.style.display = "none";

    if (systemState === "running") {
        btnPause.style.display = "inline-block";
        toggleButtons(false);
    } else if (systemState === "paused") {
        btnStart.style.display = "inline-block";
        toggleButtons(false);
    } else if (systemState === "stopped") {
        btnStart.style.display = "inline-block";
        btnAdd.style.display = "inline-block";
        toggleButtons(true);
    }
}

//Flag indicates whether or not they should be shown
function toggleButtons(flag) {
    var timeEditors = document.getElementsByClassName("timeEditor");
    var removeButtons = document.getElementsByClassName("remove");
    var copyButtons = document.getElementsByClassName("copy");
    for (var i = 0; i < timeEditors.length; ++i) {
        var style = (flag ? "inline-block" : "none");
        timeEditors[i].style.display = style;
        removeButtons[i].style.display = style;
        copyButtons[i].style.display = style;
    }
}

function addItemSection() {
    var newItemSection = createItemSection();
    document.getElementById("main").appendChild(newItemSection);
    makeSectionsSortable();
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
    timeRemainingDisplay.tabIndex = -1;

    var timeRemainingInput = document.createElement("input");
    timeRemainingInput.setAttribute("type", "text");
    timeRemainingInput.setAttribute("class", "timeEditor");
    timeRemainingInput.setAttribute("placeholder", "Time (hh:mm:ss)");
    timeRemainingInput.style.display = "inline-block";

    //This should only be visible when timers are running
    var btnCopyTimerValue = document.createElement("button");
    btnCopyTimerValue.setAttribute("class", "copy");
    btnCopyTimerValue.innerHTML = "Copy timer value";
    btnCopyTimerValue.style.display = "inline-block";
    btnCopyTimerValue.setAttribute("onclick", "copyBtnPressed(this)");
    btnCopyTimerValue.tabIndex = -1;

    timeRemainingDiv.appendChild(timeRemainingDisplay);
    timeRemainingDiv.appendChild(timeRemainingInput);
    timeRemainingDiv.appendChild(btnCopyTimerValue);
    timeRemainingDiv.style.display = "inline-block";
    //End time display

    var btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "remove");
    btnRemove.innerHTML = "Remove";
    btnRemove.style.display = "inline-block";
    btnRemove.setAttribute("onclick", "removeSectionBtnPressed(this); updateControlDisplay()");
    btnRemove.tabIndex = -1;

    var progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progressBar");
    progressBar.style.display = "block";
    progressBar.style.height = "30px";
    progressBar.style.backgroundColor = getNextColor();
    progressBar.tabIndex = -1;

    itemSection.appendChild(nameDiv);
    itemSection.appendChild(timeRemainingDiv);
    itemSection.appendChild(btnRemove);
    itemSection.appendChild(progressBar);

    return itemSection;
}

var colors = ["Blue", "Red", "Green", "Yellow", "Purple"];
var cIndex = 0;
function getNextColor() {
    var result = colors[cIndex];
    cIndex = (cIndex + 1) % colors.length;
    return result;
}
