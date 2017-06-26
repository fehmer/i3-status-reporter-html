'use strict';
/**
 *
 */
export function getWindowPosition(window, display) {
    const result = Object.assign({}, window);
    const area = display.workArea;
    const margin = window.margin || 0;

    area.mx = area.x + area.width;
    area.my = area.y + area.height;

    if (window.x + window.width > area.mx){
        result.x = area.mx - window.width - margin;
    }

    if (window.top) {
        result.y = area.y + window.barHeight + margin
    } else {
        result.y = area.my - window.height - window.barHeight - margin;
    }
    return result;

}

