
/// <reference path="../bower_components/jquery/dist/jquery.js" />
/// <reference path="../bower_components/jasmine/lib/jasmine-core/jasmine.js" />
/// <reference path="../bower_components/jasmine-jquery/lib/jasmine-jquery.js" />

/// <reference path="../wwwroot/lib/underscore.js" />
/// <reference path="../wwwroot/lib/backbone.js" />

/// <reference path="../src/appjs/timercallback.js" />

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

describe("TimerCallback", function () {

    var app;

    describe("application", function () {

        beforeEach(function () {
            app = new TimerCallbackApp();
        });

        it('app is created', function () {
            expect(app).toBeTruthy();
        });

        it("can start", function () {
            expect(app.start).toBeDefined();
        });

    });

    describe("actions", function () {
        var callback, secondsToCall = 10;

        beforeEach(function () {
            whatAmI = jasmine.createSpy('whatAmI');
            callback = jasmine.createSpy('aqq');
            app = new TimerCallbackApp(secondsToCall, callback);
            jasmine.clock().install();

        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it("timer is set", function () {
            expect(app.model.get('secondsToCall')).toBe(secondsToCall);
            expect(app.model.getMiliseconds()).toBe(secondsToCall * 1000);
        });

        it("callback is called synchronously after timer", function () {
            app.start();

            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(secondsToCall * 500);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick((secondsToCall * 500) - 1);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(1);
            expect(callback).toHaveBeenCalled();

        });

    });
});

