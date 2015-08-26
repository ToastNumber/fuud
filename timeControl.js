/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

var timers = [];
var mainTimer;

var initial; //used so that progress bars are at 50% width at appropriate time etc.
function getInitialTime() {
    return initial;
}

function startTimer(duration, display, indexOfDisplay) {
    var timer;

    if (display == document.getElementById("timer")) {
        mainTimer = new CountDownTimer(duration);
        timer = mainTimer;
    } else {
        timers[indexOfDisplay] = new CountDownTimer(duration);
        timer = timers[indexOfDisplay];
    }

    var timeObj = CountDownTimer.parse(duration);

    update(timeObj.minutes, timeObj.seconds);

    timer.onTick(update);

    function update(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;

        if (display === document.getElementById("timer")) {
            if (minutes == 0 && seconds == 0) {
                timersRunning = false;
            }
        } else {
            startRelevantTimers();
            updateProgressBar(display);
        }
    }

    startRelevantTimers();
    if (display == document.getElementById("timer")) {
        timer.start();
    }
}

function startRelevantTimers() {
    var timeDisplays = document.getElementsByClassName("timeRemaining");
    var mainTimerSeconds = getSeconds(document.getElementById("timer").innerHTML);
    for (var i = 0; i < timers.length; ++i) {
        var s = getSeconds(timeDisplays[i].innerHTML);
        if (s >= mainTimerSeconds && s > 0) {
            timers[i].start();
        }
    }
}

var timersRunning = false;
function startAllTimers() {
    var timeElements;
    var times = [];

    if (timersRunning) return;
    else if (mainTimer === undefined || mainTimer.isStopped()) {
        timeElements = document.getElementsByClassName("timeEditor");
        var invalidTimeFound = false;

        //Check for invalid elements
        for (var i = 0; i < timeElements.length; ++i) {
            if (!isValid(timeElements[i].value)) {
                timeElements[i].setAttribute("class", "timeEditor invalidInput");
                invalidTimeFound = true;
            } else {
                timeElements[i].setAttribute("class", "timeEditor");
                times.push(timeElements[i].value);
            }
        }

        if (invalidTimeFound) return;
    } else {
        timeElements = document.getElementsByClassName("timeRemaining");
        for (var i = 0; i < timeElements.length; ++i) {
            times.push(timeElements[i].innerHTML);
        }
    }

    var maxTime = 0;

    for (var i = 0; i < timeElements.length; ++i) {
        maxTime = Math.max(maxTime, getSeconds(times[i]));
    }

    if (mainTimer === undefined || mainTimer.isStopped()) {
        initial = maxTime;
    }

    startTimer(maxTime, document.getElementById("timer"));
    var itemTimers = document.getElementsByClassName("timeRemaining");
    for (var i = 0; i < itemTimers.length; ++i) {
        startTimer(getSeconds(times[i]), itemTimers[i], i);
    }

    timersRunning = true;
}

function isValid(timeString) {
    var msRegex = /([0-5]?[0-9])(:[0-5][0-9]?)?/;
    return matchExact(msRegex, timeString);
}

function matchExact(r, str) {
    var match = str.match(r);
    return match != null && str == match[0];
}

function getSeconds(msFormat) {
    var parts = msFormat.split(":");

    if (parts.length == 1) {
        return toSeconds(0, parseInt(parts[0]), 0);
    } else {
        return toSeconds(parseInt(parts[0]), parseInt(parts[1]));
    }
}

function toSeconds(minutes, seconds) {
    return 60 * minutes + seconds;
}

//if paused, truestop === false; if stopped, truestop === true
function stopAllTimers(truestop) {
    if (mainTimer !== undefined) {
        if (truestop) mainTimer.stop();
        else mainTimer.pause();
    }

    timersRunning = false;
    for (var i = 0; i < timers.length; ++i) {
        if (truestop) timers[i].stop();
        else timers[i].pause();
    }
}