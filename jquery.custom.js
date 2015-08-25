/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function updateProgressBar(timeRemainingDisplay) {
    var section = $(timeRemainingDisplay).parent().parent();
    var timeShown = timeRemainingDisplay.innerHTML;
    var percentageWidth = (100 * getSeconds(timeShown))/getInitialTime();

    var progressBar = section.find(".progressBar");
    progressBar.attr("class", "progressBar progressBarRunning");
    progressBar.css("width", percentageWidth + "%");
}


