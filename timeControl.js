/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

var initial; //used so that progress bars are at 50% width at appropriate time etc.
function startTimer(duration, display) {
    var timer = new CountDownTimer(duration),
        timeObj = CountDownTimer.parse(duration);

    update(timeObj.minutes, timeObj.seconds);

    timer.onTick(update);

    function update(minutes, seconds) {
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ':' + seconds;

        updateProgressBar(display);

        if (display === document.getElementById("timer") && minutes == 0 && seconds == 0) {
            timersRunning = false;
        }
    }

    timer.start();
    timersRunning = true;
}

var timersRunning = false;
function startAllTimers() {
    if (timersRunning) return;
    else {
        var timeInputs = document.getElementsByClassName("timeEditor");

        var maxTime = 0;
        var invalidTimeFound = false;
        for (var i = 0; i < timeInputs.length; ++i) {
            if (!isValid(timeInputs[i].value)) {
                timeInputs[i].setAttribute("class", "timeEditor invalidInput");
                invalidTimeFound = true;
            } else {
                timeInputs[i].setAttribute("class", "timeEditor");
                maxTime = Math.max(maxTime, getSeconds(timeInputs[i].value));
            }
        }

        if (invalidTimeFound) return;
        else {
            startTimer(maxTime, document.getElementById("timer"));
            var itemTimers = document.getElementsByClassName("timeRemaining");
            for (var i = 0; i < itemTimers.length; ++i) {
                startTimer(getSeconds(timeInputs[i].value), itemTimers[i]);
            }
        }

    }
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
