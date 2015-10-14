
/// <reference path="../bower_components/jquery/dist/jquery.js" />
/// <reference path="../bower_components/jasmine/lib/jasmine-core/jasmine.js" />
/// <reference path="../bower_components/jasmine-jquery/lib/jasmine-jquery.js" />

/// <reference path="../wwwroot/lib/underscore.js" />
/// <reference path="../wwwroot/lib/backbone.js" />
/// <reference path="../wwwroot/lib/moment.js" />

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
        var callback, secondsToCall = 9;

        beforeEach(function () {
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

        it("endDate is set", function () {
            console.log("getEndDate", app.model.getEndDate());
            expect(app.model.getEndDate()).toBeTruthy();
            expect(app.model.getEndDate().isSame(new Date().getTime() + secondsToCall * 1000, 'second')).toBe(true);
            //expect(app.model.getMiliseconds()).toBe(secondsToCall * 1000);
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

        it("calling start again blocks callback call and resets timer", function () {
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
        var callback, secondsToCall = 90,
            domElement = '#timerInfo',
            endDate = moment().add(secondsToCall, 's');

        beforeEach(function () {
            callback = jasmine.createSpy('aqq');
            setFixtures("<div id='timerInfo'>...</div>");
            app = new TimerCallbackApp(secondsToCall, callback, domElement);
        });

        it('view is set', function () {
            expect(app.view).toBeTruthy();
            expect(app.view.model).toBeTruthy();
        });

        it('view displays remining time', function () {
            app.start();
            expect($(domElement).text()).toBe(secondsToCall);
            console.log('info', $(domElement), app.model.getEndDate(), $(domElement).text());
        });


    });
});

