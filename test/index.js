'use strict';

import { expect } from 'chai';
import HtmlReporter from './../src/index.js';

describe('HtmlReporter', () => {

    describe('#constructor', () => {
        it('should construct with defaults', () => {
            //construct block
            var block = new HtmlReporter({
            });


            expect(block.options.top).to.be.false;
            expect(block.options.window.height).to.equal(200)
            expect(block.options.window.width).to.equal(600);

            expect(block.colors.normalText).to.equal('#444');
            expect(block.colors.normalBackground).to.equal('#eee');
            expect(block.colors.highlightText).to.equal('#f00');
            expect(block.colors.highlightBackground).to.equal('#000');

            expect(block.font.size).to.equal(13);

            expect(block.main).to.not.be.undefined;
            expect(block.template).to.not.be.undefined;
        });

        it('should constuct using options', () => {
            var block = new HtmlReporter({
                timeout: 8,
                barHeight: 2,
                top: true,
                margin: 10,
                height: 10,
                width: 12,
                colors: {
                    normalText: 'blue',
                    normalBackground: 'red',
                    highlightText: 'yellow',
                    highlightBackground: 'lime'
                },

                font: {
                    family: 'Arial',
                    size: 20
                },
                debug: true
            });

            expect(block.options.timeout).to.equal(8);
            expect(block.options.barHeight).to.equal(2);
            expect(block.options.top).to.be.true;
            expect(block.options.window.height).to.equal(10)
            expect(block.options.window.width).to.equal(12);
            expect(block.options.debug).to.be.true;

            expect(block.colors.normalText).to.equal('blue');
            expect(block.colors.normalBackground).to.equal('red');
            expect(block.colors.highlightText).to.equal('yellow');
            expect(block.colors.highlightBackground).to.equal('lime');

            expect(block.font.family).to.equal('Arial');
            expect(block.font.size).to.equal(20);

            expect(block.main).to.not.be.undefined;
            expect(block.template).to.not.be.undefined;
        })
    });

});
