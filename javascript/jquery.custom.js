/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function makeSectionsSortable(flag) {
    if (flag) {
        $("#main").sortable(); //to initialise being sortable
        $("#main").sortable("enable"); //to enable after being disabled
    } else {
        $("#main").sortable("disable");
    }
}

function updateProgressBar(timeRemainingDisplay) {
    var section = $(timeRemainingDisplay).parent().parent();
    var timeShown = timeRemainingDisplay.innerHTML;
    var percentageWidth = (100 * getSeconds(timeShown)) / _initial;

    var progressBar = section.find(".progressBar");
    progressBar.css("width", percentageWidth + "%");
}

function removeSectionBtnPressed(removeButton) {
    var item = $(removeButton).parent();
    var time = 200;
    item.fadeTo(time, 0.0);
    setTimeout(function() {item.remove()}, time);

}

function copyBtnPressed(copyButton) {
    var siblings = $(copyButton).siblings();
    var timeEditor = siblings.filter(".timeEditor");
    var timeRemaining = siblings.filter(".timeRemaining")[0].innerHTML;

    $(timeEditor).val(timeRemaining);
}


