
var TimerCallbackView = Backbone.View.extend({
    initialize: function () {
    },
    events: {
    },
    autoRender: function () {
        var self = this;
        if (this.interval)
            clearInterval(self.interval);
        this.interval = setInterval(function () {
            self.render();
            //console.debug('time left', self.model.getTimeLeft() / 1000)
            if (self.model.getTimeLeft() <= 0)
                clearInterval(self.interval);
        }, 1000);
        return this.render();
    },
    render: function () {
        this.$el.text(Math.round(this.model.getTimeLeft() / 1000));
        return this;
    }
});

var TimerCallbackModel = Backbone.Model.extend({
    initialize: function () {
        this.endDate = new Date(new Date().getTime() + this.getMiliseconds());
    },
    startTimer: function () {
        if (this.timeout)
            clearTimeout(this.timeout);
        this.timeout = setTimeout(this.get('callBack'), this.getMiliseconds());
        this.endDate = new Date(new Date().getTime() + this.getMiliseconds());
        return this.timeout;
    },
    getMiliseconds: function () {
        return this.get('secondsToCall') * 1000;
    },
    getEndDate: function () {
        return this.endDate;
    },
    getTimeLeft: function () {
        return this.getEndDate().getTime() - new Date().getTime();
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
            this.view.autoRender();
    };

};


