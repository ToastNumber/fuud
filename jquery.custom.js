/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function makeSectionsSortable() {
    //$("#main").sortable();
}

function updateProgressBar(timeRemainingDisplay) {
    var section = $(timeRemainingDisplay).parent().parent();
    var timeShown = timeRemainingDisplay.innerHTML;
    var percentageWidth = (100 * getSeconds(timeShown)) / _initial;

    var progressBar = section.find(".progressBar");
    progressBar.attr("class", "progressBar progressBarRunning");
    progressBar.css("width", percentageWidth + "%");
}

function removeSectionBtnPressed(removeButton) {
    $(removeButton).parent().remove();
}

function copyBtnPressed(copyButton) {
    var siblings = $(copyButton).siblings();
    var timeEditor = siblings.filter(".timeEditor");
    var timeRemaining = siblings.filter(".timeRemaining")[0].innerHTML;

    $(timeEditor).val(timeRemaining);
}




