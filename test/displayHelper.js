'use strict';

import { expect } from 'chai';
import getWindowPosition from './../electron/src/displayHelper.js';

describe('DisplayHelper', function() {

    describe('getWindowPosition with bottom align', function() {
        it('should leave positions for matching window', () => {
            var display = firstScreen();
            var window = makeWindow(800, 400);
            window = click(500, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(500);
            expect(position.y).to.equal(2160 - 400 - 20); // screen height - window height - bar height
        });

        it('should reduce x position for window to far right', () => {
            var display = firstScreen();
            var window = makeWindow(800, 400);
            window = click(3840, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3040);
            expect(position.y).to.equal(2160 - 400 - 20); // screen height - window height - bar height
        });

        it('should reduce x position for window to far right with margin', () => {
            var display = firstScreen();
            var window = makeWindow(800, 400, 20, 10);
            window = click(3840, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3030);
            expect(position.y).to.equal(2160 - 400 - 20 - 10); // screen height - window height - bar height - margin
        });
    });


    describe('getWindowPosition with top align', function() {
        it('should leave positions for matching window', () => {
            var display = firstScreen();
            var window = makeWindow(800, 400, 20, 0, true);
            window = click(500, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(500);
            expect(position.y).to.equal(20); // bar height
        });

        it('should reduce x position for window to far right', () => {
            var display = firstScreen();
            var window = makeWindow(800, 400, 20, 0, true);
            window = click(3840, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3040);
            expect(position.y).to.equal(20); // bar height
        });

        it('should reduce x position for window to far right with margin', () => {
            var display = firstScreen();
            var window = makeWindow(800, 400, 20, 10, true);
            window = click(3840, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3030);
            expect(position.y).to.equal(20 + 10); // bar height + margin
        });
    });

    describe('getWindowPosition second screen horinzontal with bottom align', function() {
        it('should leave positions for matching window', () => {
            var display = secondScreenHorizontal();
            var window = makeWindow(800, 400);
            window = click(3840, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3840);
            expect(position.y).to.equal(1920 - 400 - 20); // screen height - window height - bar height
        });

        it('should reduce x position for window to far right', () => {
            var display = secondScreenHorizontal();
            var window = makeWindow(800, 400);
            window = click(4800, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3840 + 1200 - 800); // screen2 start + screen width - window width
            expect(position.y).to.equal(1920 - 400 - 20); // screen height - window height - bar height
        });

        it('should reduce x position for window to far right with margin', () => {
            var display = secondScreenHorizontal();
            var window = makeWindow(800, 400, 20, 10);
            window = click(4800, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3840 + 1200 - 800 - 10); // screen2 start + screen width - window width - margin
            expect(position.y).to.equal(1920 - 400 - 20 - 10); // screen height - window height - bar height - margin
        });
    });


    describe('getWindowPosition second screen horinzontal with top align', function() {
        it('should leave positions for matching window', () => {
            var display = secondScreenHorizontal();
            var window = makeWindow(800, 400, 20, 0, true);
            window = click(3840, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3840);
            expect(position.y).to.equal(20); // bar height
        });

        it('should reduce x position for window to far right', () => {
            var display = secondScreenHorizontal();
            var window = makeWindow(800, 400, 20, 0, true);
            window = click(4800, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3840 + 1200 - 800); // screen2 start + screen width - window width
            expect(position.y).to.equal(20); // bar height
        });

        it('should reduce x position for window to far right with margin', () => {
            var display = secondScreenHorizontal();
            var window = makeWindow(800, 400, 20, 10, true);
            window = click(4800, 400, window);

            var position = getWindowPosition(window, display);

            expect(position.x).to.equal(3840 + 1200 - 800 - 10); // screen2 start + screen width - window width
            expect(position.y).to.equal(20 + 10); // bar height + margin
        });
    });


});


function makeWindow(width, height, barHeight, margin, top) {
    return {
        height: height,
        width: width,
        barHeight: barHeight || 20,
        margin: margin || 0,
        top: top || false
    };
}

function click(x, y, window) {
    window.x = x;
    window.y = y;
    return window;
}

function firstScreen() {
    return {
        id: 0,
        bounds: {
            x: 0,
            y: 0,
            width: 3840,
            height: 2160
        },
        workArea: {
            x: 0,
            y: 0,
            width: 3840,
            height: 2160
        },
        size: {
            width: 3840,
            height: 2160
        },
        workAreaSize: {
            width: 3840,
            height: 2160
        },
        scaleFactor: 1,
        rotation: 0,
    };

}

function secondScreenHorizontal() {
    return {
        id: 1,
        bounds: {
            x: 3840,
            y: 0,
            width: 1200,
            height: 1920
        },
        workArea: {
            x: 3840,
            y: 0,
            width: 1200,
            height: 1920
        },
        size: {
            width: 1200,
            height: 1920
        },
        workAreaSize: {
            width: 1200,
            height: 1920
        },
        scaleFactor: 1,
        rotation: 0
    };

}

function secondScreenVertical() {
    return {
        id: 1,
        bounds: {
            x: 3840,
            y: 0,
            width: 1200,
            height: 1920
        },
        workArea: {
            x: 0,
            y: 2160,
            width: 1200,
            height: 1920
        },
        size: {
            width: 1200,
            height: 1920
        },
        workAreaSize: {
            width: 1200,
            height: 1920
        },
        scaleFactor: 1,
        rotation: 0
    };

}