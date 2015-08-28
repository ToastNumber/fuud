/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

$(document).ready(function() {
    //Slides the food section instantly

    var selectionSection = document.getElementById("presetSelection");
    // Set the effect type
    var effect = 'slide';
    // Set the options for the effect type chosen
    var options = {direction: "right"};
    // Set the duration (default: 400 milliseconds)
    $(selectionSection).toggle(effect, options, 1);
});

var _foodShown = false;
var _animationDuration = 500;
function toggleFoodSection() {
    var mainSection = document.getElementById("main");
    if (_foodShown) {
        //...hide it
        $(mainSection).animate({right: "80px"}, _animationDuration);
        slideFoodSection();
    } else {
        $(mainSection).animate({right: "20%"}, _animationDuration);
        slideFoodSection();
    }

    _foodShown = !_foodShown;
}

function slideFoodSection() {
    var selectionSection = document.getElementById("presetSelection");
    // Set the effect type
    var effect = 'slide';
    // Set the options for the effect type chosen
    var options = {direction: "right"};
    // Set the duration (default: 400 milliseconds)
    $(selectionSection).toggle(effect, options, _animationDuration);
}

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
    setTimeout(function () {
        item.remove()
    }, time);

}

function copyBtnPressed(copyButton) {
    var siblings = $(copyButton).siblings();
    var timeEditor = siblings.filter(".timeEditor");
    var timeRemaining = siblings.filter(".timeRemaining")[0].innerHTML;

    $(timeEditor).val(timeRemaining);
}


