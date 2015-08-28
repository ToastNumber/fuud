/**
 * Created by Kelsey McKenna on 27/08/2015.
 */

function isValid(timeString) {
    var msRegex = /([0-5]?[0-9])(:[0-5][0-9]?)?/;
    return matchExact(msRegex, timeString) && getSeconds(timeString) !== 0;
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

//If the system is stopped, then it will get the maximum time timeEditor time
//If the system is paused, then it will get the maximum time shown in the displays
//This assumes that all timeEditor values entered are correct (if these are the data sources)
function getMaxTimeShown() {
    var timeEditors = document.getElementsByClassName("timeEditor");
    var timeDisplays = document.getElementsByClassName("timeRemaining");

    var maxTime = 0;
    for (var i = 0; i < timeEditors.length; ++i) {
        var time;
        if (_systemPaused) {
            time = getSeconds(timeDisplays[i].innerHTML);
        } else {
            time = getSeconds(timeEditors[i].value);
        }

        maxTime = Math.max(maxTime, time);
    }

    return maxTime;
}

function labelValidTimes() {
    var timeEditors = document.getElementsByClassName("timeEditor");

    for (var i = 0; i < timeEditors.length; ++i) {
        if (isValid(timeEditors[i].value)) timeEditors[i].setAttribute("class", "timeEditor");
        else timeEditors[i].setAttribute("class", "timeEditor invalidTime");
    }
}

function invalidTimeEntered() {
    var timeEditors = document.getElementsByClassName("timeEditor");

    for (var i = 0; i < timeEditors.length; ++i) {
        if (!isValid(timeEditors[i].value))  return true;
    }

    return false;
}
