
var HtmlReporter = require('./../lib/').default;

var options = {
    timeout: 5,
    height: 10,
    width: 1200,
    barHeight: 28,
    margin: 0 ,
    colors: {
        normalText: '#FFFFFF',
        normalBackground: '#445566',
        highlightText: '#0000FF',
        highlightBackground: '#FF0000'
    },
    debug: true
};
var content = '<ul><li><a href="https://git.sexy-developer.com/cfe/i3-status-reporter-html">i3-status-reporter-html</a></li><li><a href="https://git.sexy-developer.com/cfe/i3-status">i3-status</a></li></ul>'

var reporter = new HtmlReporter(options);
reporter.display({
    header: 'Failed builds on git.sexy-developer.com',
    content: content
}, {
    x: 3820,
    y: 2144
});

var options2 = Object.assign({top:true}, options);
var reporter2 = new HtmlReporter(options2);
setTimeout(function() {
    reporter2.display({
        header: 'Another Window',
        content: '<h1>Nothing to see here</h1>',
        userStyle: 'hello'
    })
}, 1000);

