
/// <reference path="../bower_components/jquery/dist/jquery.js" />
/// <reference path="../bower_components/jasmine/lib/jasmine-core/jasmine.js" />
/// <reference path="../bower_components/jasmine-jquery/lib/jasmine-jquery.js" />

/// <reference path="../wwwroot/lib/underscore.js" />
/// <reference path="../wwwroot/lib/backbone.js" />
// <reference path="../wwwroot/lib/moment.js" />

/// <reference path="../src/appjs/timercallback.js" />

describe("A suite", function () {
    it("contains spec with an expectation", function () {
        expect(true).toBe(true);
    });
});

describe("TimerCallback", function () {
    var round2Sec = function (val) {
        return Math.round(val / 1000);
    };

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
        var callback, secondsToCall = 600, startDate;

        beforeEach(function () {
            callback = jasmine.createSpy('aqq');
            jasmine.clock().install();
            jasmine.clock().mockDate(new Date());
            app = new TimerCallbackApp(secondsToCall, callback);
            startDate = new Date();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it("timer is set", function () {
            expect(app.model.get('secondsToCall')).toBe(secondsToCall);
            expect(app.model.getMiliseconds()).toBe(secondsToCall * 1000);
        });

        it("endDate is set", function () {
            console.log("getEndDate", app.model.getEndDate());
            expect(app.model.getEndDate()).toBeTruthy();
            expect(round2Sec(app.model.getEndDate().getTime())).toEqual(round2Sec(startDate.getTime() + secondsToCall * 1000));
        });

        it("getTimeLeft returns correct value", function () {
            console.log("getTimeLeft", app.model.getTimeLeft());
            app.start();
            //expect(app.model.getTimeLeft).toBeTruthy();
            //expect(app.model.getEndDate().isSame(new Date().getTime() + secondsToCall * 1000, 'second')).toBe(true);
            expect(round2Sec(app.model.getTimeLeft())).toEqual(secondsToCall);
        });

        it("getTimeLeft returns correct value after timer restart", function () {
            console.log("getTimeLeft", app.model.getTimeLeft());
            app.start();
            //expect(app.model.getTimeLeft).toBeTruthy();
            //expect(app.model.getEndDate().isSame(new Date().getTime() + secondsToCall * 1000, 'second')).toBe(true);
            expect(round2Sec(app.model.getTimeLeft())).toEqual(secondsToCall);

            jasmine.clock().tick(2000);
            console.log("getTimeLeft", app.model.getTimeLeft());
            expect(round2Sec(app.model.getTimeLeft())).toEqual(secondsToCall - 2);
            app.start();
            expect(round2Sec(app.model.getTimeLeft())).toEqual(secondsToCall);
            console.log("getTimeLeft", app.model.getTimeLeft());

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

        it("calling start again blocks callback call", function () {
            app.start();

            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(secondsToCall * 500);
            expect(callback).not.toHaveBeenCalled();

            app.start();


            jasmine.clock().tick(secondsToCall * 500);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(secondsToCall * 500 - 1);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(1);
            expect(callback).toHaveBeenCalled();

        });

        it("calling start again resets timer", function () {
            app.start();
            jasmine.clock().tick(secondsToCall * 500);
            expect(callback).not.toHaveBeenCalled();

            app.start();

            expect(round2Sec(app.model.getTimeLeft())).toEqual(secondsToCall);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(secondsToCall * 500);
            expect(callback).not.toHaveBeenCalled();

            jasmine.clock().tick(secondsToCall * 500);
            expect(callback).toHaveBeenCalled();

        });

        it("callback called after set seconds", function () {
            var t1, t2;
            jasmine.clock().mockDate(new Date());
            callback.and.callFake(function () {
                t2 = new Date().getTime();
            });

            t1 = new Date().getTime();
            app.start();

            jasmine.clock().tick(secondsToCall * 1000);
            expect(callback).toHaveBeenCalled();
            expect(secondsToCall).toEqual((t2 - t1) / 1000);
            console.log(t1, t2, 'diff:', t2 - t1, new Date().getTime() - t1);
        });
    });

    describe("view", function () {
        var callback, secondsToCall = 40,
            domElement = '#timerInfo',
            endDate = new Date(new Date().getTime() + secondsToCall * 1000);

        beforeEach(function () {
            jasmine.clock().install();
            jasmine.clock().mockDate(new Date());
            callback = jasmine.createSpy('aqq');
            setFixtures("<div id='timerInfo'>...</div>");
            app = new TimerCallbackApp(secondsToCall, callback, domElement);
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it('view is set', function () {
            expect(app.view).toBeTruthy();
            expect(app.view.model).toBeTruthy();
        });

        it('view displays remining time', function () {
            app.start();
            expect(Math.round($(domElement).text())).toEqual(secondsToCall);
            console.log('info', $(domElement), app.model.getEndDate(), $(domElement).text());
        });

        it('view displays refresh remining time each second', function () {

            app.start();
            expect(Math.round($(domElement).text())).toEqual(secondsToCall);

            jasmine.clock().tick(4 * 1000);
            console.log('time left ', app.model.getEndDate(), $(domElement).text());
            expect(Math.round($(domElement).text())).toEqual(secondsToCall - 4);
        });

        it('view displays refresh stop after timer finished', function () {
            spyOn(app.view, 'render').and.callThrough();
            app.start();
            expect(Math.round($(domElement).text())).toEqual(secondsToCall);


            expect(app.view.render.calls.count()).toEqual(1);

            jasmine.clock().tick((secondsToCall) * 1000);
            console.log('time left ', app.model.getEndDate(), $(domElement).text());
            app.view.render.calls.reset();
            expect(Math.round($(domElement).text())).toEqual(0);

            jasmine.clock().tick(1000);
            jasmine.clock().tick(1000);
            jasmine.clock().tick(5000);
            expect(app.view.render.calls.count()).toEqual(0);
        });

        it('view refresh remining time after timer restart', function () {

            app.start();
            jasmine.clock().tick(4 * 1000);
            console.log('time left ', app.model.getEndDate(), $(domElement).text());
            expect(Math.round($(domElement).text())).toEqual(secondsToCall - 4);

            app.start();
            console.log('time left ', app.model.getEndDate(), $(domElement).text());
            expect(Math.round($(domElement).text())).toEqual(secondsToCall);

        });

    });
});

