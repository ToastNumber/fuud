/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function initialise() {
    document.getElementById("btnAdd").setAttribute("onclick", "addItemSection()");
    document.getElementById("btnStart").setAttribute("onclick", "startAllTimers()");
    document.getElementById("btnStop").setAttribute("onclick", "stopAllTimers(true)");
    document.getElementById("btnPause").setAttribute("onclick", "stopAllTimers(false)");

    updateControlDisplay();
}

function updateControlDisplay() {
    var btnPause = document.getElementById("btnPause");
    var btnStart = document.getElementById("btnStart");
    var btnAdd = document.getElementById("btnAdd");
    var systemState = getSystemState();

    btnStart.style.display = "none";
    btnPause.style.display = "none";
    btnAdd.style.display = "none";

    if (systemState === "running") {
        btnPause.style.display = "inline-block";
        toggleButtons(false);
        makeSectionsSortable(false);
    } else if (systemState === "paused") {
        btnStart.style.display = "inline-block";
        toggleButtons(false);
    } else if (systemState === "stopped") {
        btnStart.style.display = "inline-block";
        btnAdd.style.display = "inline-block";
        toggleButtons(true);
        makeSectionsSortable(true);
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
    makeSectionsSortable(true);
}

function createItemSection() {
    var itemSection = document.createElement("div");
    itemSection.setAttribute("class", "itemSection");

    var nameDiv = document.createElement("div");
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("class", "name");
    nameInput.setAttribute("placeholder", "Name");
    addEnterKeyListener(nameInput);
    nameDiv.appendChild(nameInput);


    //Time display
    var timeRemainingDiv = document.createElement("div");
    var timeRemainingDisplay = document.createElement("div");
    timeRemainingDisplay.setAttribute("class", "timeRemaining");
    timeRemainingDisplay.innerHTML = "00:00";
    timeRemainingDisplay.tabIndex = -1;

    var timeRemainingInput = document.createElement("input");
    timeRemainingInput.setAttribute("type", "text");
    timeRemainingInput.setAttribute("class", "timeEditor");
    timeRemainingInput.setAttribute("placeholder", "Time (mm:ss)");
    addEnterKeyListener(timeRemainingInput);

    //This should only be visible when timers are running
    var btnCopyTimerValue = document.createElement("button");
    btnCopyTimerValue.setAttribute("class", "copy");
    btnCopyTimerValue.innerHTML = "Copy timer";
    btnCopyTimerValue.setAttribute("onclick", "copyBtnPressed(this)");
    btnCopyTimerValue.tabIndex = -1;

    timeRemainingDiv.appendChild(timeRemainingDisplay);
    timeRemainingDiv.appendChild(timeRemainingInput);
    timeRemainingDiv.appendChild(btnCopyTimerValue);
    //End time display

    var btnRemove = document.createElement("button");
    btnRemove.setAttribute("class", "remove");
    btnRemove.innerHTML = "Remove";
    btnRemove.setAttribute("onclick", "removeSectionBtnPressed(this); updateControlDisplay()");
    btnRemove.tabIndex = -1;

    var progressBar = document.createElement("div");
    progressBar.setAttribute("class", "progressBar");
    progressBar.style.backgroundColor = getNextColor();
    progressBar.tabIndex = -1;

    itemSection.appendChild(nameDiv);
    itemSection.appendChild(timeRemainingDiv);
    itemSection.appendChild(btnRemove);
    itemSection.appendChild(progressBar);

    return itemSection;
}

function addEnterKeyListener(element) {
    element.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            startAllTimers();
        }
    });
}

var colors = ["Blue", "Red", "Green", "Yellow", "Purple"];
var cIndex = 0;
function getNextColor() {
    var result = colors[cIndex];
    cIndex = (cIndex + 1) % colors.length;
    return result;
}

var _soundOn = true;
function toggleSound() {
    var soundImage = document.getElementById("soundImage");
    soundImage.src = "images/" + (_soundOn ? "volume_off.png" : "volume_on.png");

    _soundOn = !_soundOn;
}

function presetSelection(imageSelected) {
    var newItemSection = createItemSection();

    var set = function (name, time) {
        newItemSection.getElementsByClassName("name")[0].value = name;
        newItemSection.getElementsByClassName("timeEditor")[0].value = time;
    }

    if (imageSelected.id === "sausage") set("Sausages", "35:00");
    else if (imageSelected.id === "chip") set("Chips", "25:00");
    else if (imageSelected.id === "bean") set("Beans", "3:00");
    else if (imageSelected.id ==="waffle") set("Waffles", "20:00");

    document.getElementById("main").appendChild(newItemSection);
    makeSectionsSortable(true);
}

function clearSections() {
    var sections = document.getElementsByClassName("itemSection");
    for (var i = sections.length - 1; i >= 0; --i) {
        sections[i].remove();
    }
}






