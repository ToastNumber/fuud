/**
 * Created by Kelsey McKenna on 27/08/2015.
 */

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

