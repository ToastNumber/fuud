/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function makeSectionsSortable() {
    $("#main").sortable();
}

function updateProgressBar(timeRemainingDisplay) {
    var section = $(timeRemainingDisplay).parent().parent();
    var timeShown = timeRemainingDisplay.innerHTML;
    var percentageWidth = (100 * getSeconds(timeShown)) / getInitialTime();

    var progressBar = section.find(".progressBar");
    progressBar.attr("class", "progressBar progressBarRunning");
    progressBar.css("width", percentageWidth + "%");
}

function removeSectionBtnPressed(removeButton) {
    var syncAllTimeInputs = function() {
        var timeInputs = document.getElementsByClassName("timeEditor");
        var timeDisplays = document.getElementsByClassName("timeRemaining");
        for (var i = 0; i < timeInputs.length; ++i) {
            timeInputs[i].value = timeDisplays[i].innerHTML;
        }
    }

    $(removeButton).parent().remove();
    stopAllTimers(false);
    startAllTimers();
}

function copyBtnPressed(copyButton) {
    var time = $(copyButton).siblings(".timeRemaining");
    console.log(time);
}




