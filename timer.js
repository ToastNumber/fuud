/**
 * Created by Kelsey McKenna on 25/08/2015.
 */

function CountDownTimer(duration, granularity) {
    this.duration = duration || 0;
    this.granularity = granularity || 1000;
    this.tickFtns = [];
    this.running = false;
    this.stopped = false;
    this.paused = false;
}

CountDownTimer.prototype.stop = function() {
    this.stopped = true;
    this.running = false;
    this.paused = false;
}
CountDownTimer.prototype.isStopped = function() {
    return this.stopped && !this.paused;
}

CountDownTimer.prototype.pause = function() {
    if (this.stopped || !this.running) return;

    this.paused = true;
}

CountDownTimer.prototype.isPaused = function() {
    return this.paused;
}

CountDownTimer.prototype.start = function() {
    if (this.running) {
        return;
    }
    this.running = true;
    var start = Date.now(),
        that = this,
        diff,
        obj;

    (function timer() {
        if (that.stopped || that.paused) return;

        diff = that.duration - (((Date.now() - start) / 1000) | 0);

        if (diff > 0) {
            setTimeout(timer, that.granularity);
        } else {
            diff = 0;
            that.running = false;
        }

        obj = CountDownTimer.parse(diff);
        that.tickFtns.forEach(function(ftn) {
            ftn.call(this, obj.minutes, obj.seconds);
        }, that);
    }());
};

CountDownTimer.prototype.onTick = function(ftn) {
    if (typeof ftn === 'function') {
        this.tickFtns.push(ftn);
    }
    return this;
};

CountDownTimer.prototype.expired = function() {
    return !this.running;
};

CountDownTimer.parse = function(seconds) {
    return {
        'minutes': (seconds / 60) | 0,
        'seconds': (seconds % 60) | 0
    };
};