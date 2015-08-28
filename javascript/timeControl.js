/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

var _timers = [];
var _initial; //used so that progress bars are at 50% width at appropriate time etc.

function startTimer(duration, display) {
    var mainTimerDisplay = document.getElementById("timer");
    var timerToUse = new CountDownTimer(duration);

    if (display !== mainTimerDisplay) {
        _timers.push(timerToUse);
    }

    var timeObj = CountDownTimer.parse(duration);

    tick(timeObj.minutes, timeObj.seconds);
    timerToUse.onTick(tick);

    function tick(minutes, seconds) {
        format(minutes, seconds, display);
        updateSubTimers();
        if (display !== mainTimerDisplay) stopIfEnded();
    }

    if (display === mainTimerDisplay) timerToUse.start();
}

function format(minutes, seconds, display) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ':' + seconds;
}
function stopIfEnded() {
    if (getSeconds(document.getElementById("timer").innerHTML) === 0
        && !anyTimersRunning()) {
        stopAllTimers(true);
        if (_soundOn) playStopSound();
    }
}
function playStopSound() {
    var audio = new Audio('http://www.freesound.org/data/previews/264/264594_65641-lq.mp3');
    audio.play();
    setTimeout(function() {audio.pause()}, 2000);
}
function anyTimersRunning() {
    for (var i = 0; i < _timers.length; ++i) {
        if (_timers[i].running) return true;
    }
    return false;
}
function updateSubTimers() {
    var mainTimerSeconds = getSeconds(document.getElementById("timer").innerHTML);
    var timeDisplays = document.getElementsByClassName("timeRemaining");

    for (var i = 0; i < _timers.length; ++i) {
        var s = getSeconds(timeDisplays[i].innerHTML);
        if (s >= mainTimerSeconds && s > 0) {
            _timers[i].start();
        }

        updateProgressBar(timeDisplays[i]);
    }
}

function startAllTimers() {
    var numSections = document.getElementsByClassName("itemSection").length;
    if (numSections === 0) return;

    clearTimers();

    //Return if the timers are already running
    if (_systemRunning) return;
    else if (!invalidTimeEntered()) {
        //The durations to be given to the timers for each section
        var times = [];
        var timeDisplays = document.getElementsByClassName("timeRemaining");
        var timeEditors = document.getElementsByClassName("timeEditor");
        var mainTimerDisplay = document.getElementById("timer");

        //Push all times
        for (var i = 0; i < timeDisplays.length; ++i) {
            var time;
            if (getSystemState() === "paused") time = timeDisplays[i].innerHTML;
            else time = timeEditors[i].value;

            times.push(time);
        }

        var maxTime = getMaxTimeShown();

        //If the system is not paused, then restart the system with a new initial value
        if (!_systemPaused) {
            _initial = maxTime;
        }

        setSystemState("running");

        //TODO check this
        startTimer(maxTime, mainTimerDisplay);

        //Start other timers
        for (var i = 0; i < timeDisplays.length; ++i) {
            startTimer(getSeconds(times[i]), timeDisplays[i]);
        }
    }

    labelValidTimes();
}

//if paused, truestop === false; if stopped, truestop === true
function stopAllTimers(truestop) {
    clearTimers();

    if (truestop) setSystemState("stopped");
    else setSystemState("paused");
}

function clearTimers() {
    for (var i = 0; i < _timers.length; ++i) {
        _timers[i] = undefined;
    }
    _timers = [];
}

