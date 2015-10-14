
var TimerCallbackView = Backbone.View.extend({
    initialize: function () {
        //var self = this;
        //this.interval = setInterval(function () {
        //    self.render();
        //}, 500);
    },
    events: {
    },
    render: function () {
        this.$el.text(this.model.getEndDate().fromNow());
        return this;
    }
});

var TimerCallbackModel = Backbone.Model.extend({
    initialize: function () {
        this.endDate = moment().add(this.getMiliseconds(), 'ms');
    },
    startTimer: function () {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(this.get('callBack'), this.getMiliseconds());
        return this.timeout;
    },
    getMiliseconds: function () {
        return this.get('secondsToCall') * 1000;
    },
    getEndDate: function () {
        return this.endDate;
    }
});

var TimerCallbackApp = function (secondsToCall, callBack, element) {

    this.model = new TimerCallbackModel({
        secondsToCall: secondsToCall,
        callBack: callBack
    });

    if (element) {
        this.view = new TimerCallbackView({ model: this.model, el: element });
    }

    this.start = function () {
        this.model.startTimer();
        if (this.view)
            this.view.render();
    };

};


