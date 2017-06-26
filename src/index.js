import electron from 'electron';
import { execFile } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import Handlebars from 'handlebars';
import tmp from 'tmp';

const defaultParameter = {
    colors: {
        normalText: '#444',
        normalBackground: '#eee',
        highlightText: '#f00',
        highlightBackground: '#000'
    },
    font: {
        size: 13
    }
}

export default class HtmlReporter {
    constructor({ //
            timeout, //
            barHeight, //
            top=false, //
            margin, //
            height= 200, //
            width= 600, //
            colors, //
            font, //
            debug=false //
        } = {}) {

        tmp.setGracefulCleanup();

        // set fields, apply default parameter
        Object.assign(this, {
            options: {
                timeout,
                barHeight,
                top,
                margin,
                window: {
                    height,
                    width
                },
                debug
            },
            colors: Object.assign({}, defaultParameter.colors, colors),
            font: Object.assign({}, defaultParameter.font, font),
            main: resolve(__dirname, '../lib/main.js'),
            template: Handlebars.compile(readFileSync(resolve(__dirname, '../content/main.html')).toString('utf8'))
        });
    }

    display(data, target) {
        const context = Object.assign({}, data);
        context.color = this.colors;
        context.font = this.font;

        //user_style can use handlebar
        if (context.userStyle)
            context.userStyle = Handlebars.compile(data.userStyle)(context);


        //render template to temp file
        const rendered = this.template(context);
        const file = tmp.tmpNameSync();
        writeFileSync(file, rendered);

        //copy settings, apply target coordinates
        const settings = Object.assign({}, this.options);
        settings.click = target || {};

        //launch electron with temp file
        execFile(electron, [this.main, file, JSON.stringify(settings)]);

    }

    supports(type) {
        return type == 'html';
    }
}