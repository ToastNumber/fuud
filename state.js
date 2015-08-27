/**
 * Created by Kelsey McKenna on 27/08/2015.
 */

//_systemRunning === true indicates that the timers are running
//_systemPaused  === has a similar effect as _systemRunning,
// but when the timers are started again, the timers will start at
//the same time as they were paused
var _systemRunning = false; //If this is false, it is equivalent to the system being 'stopped'
var _systemPaused = false;
var _systemStopped = true;
function setSystemState(state) {
    _systemRunning = false;
    _systemPaused = false;
    _systemStopped = false;

    if (state === "running") {
        _systemRunning = true;
    } else if (state === "paused") {
        _systemPaused = true;
    } else if (state === "stopped") {
        _systemStopped = true;
    } else {
        alert("setSystemState - ERROR");
    }
}

function getSystemState(){
    if (_systemRunning) return "running";
    else if (_systemPaused) return "paused";
    else if (_systemStopped) return "stopped";
    else return "unknown";
}

