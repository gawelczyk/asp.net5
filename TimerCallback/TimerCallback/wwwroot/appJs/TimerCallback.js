
var TimerCallbackView = Backbone.View.extend({
    initialize: function () { },
    events: {
    },
    render: function () {
    }
});

var TimerCallbackModel = Backbone.Model.extend({    
    startTimer: function () {
        this.timeout = setTimeout(this.get('callBack'), this.getMiliseconds());
        return this.timeout;
    },
    getMiliseconds: function () {
        return this.get('secondsToCall') * 1000;
    }
});

var TimerCallbackApp = function (secondsToCall, callBack) {

    this.model = new TimerCallbackModel({
        secondsToCall: secondsToCall,
        callBack: callBack
    });

    this.start = function () {
        this.model.startTimer();
    };

};


