# i3-status-reporter-html

The i3-status-reporter-html uses [electron](https://electron.atom.io/) to display additional information from modules.

[![npm version](https://img.shields.io/npm/v/i3-status-reporter-html.svg?style=flat-square)](https://www.npmjs.com/package/i3-status-reporter-html)
[![Node.js CI](https://github.com/fehmer/i3-status-reporter-html/actions/workflows/node.js.yml/badge.svg)](https://github.com/fehmer/i3-status-reporter-html/actions/workflows/node.js.yml)
## Table of content

<!-- MarkdownTOC autolink="true" -->

- [Installation](#installation)
- [Configuration](#configuration)
  - [Timeout](#timeout)
  - [barHeight](#barheight)
  - [Top](#top)
  - [Margin](#margin)
  - [Height, Width](#height-width)
  - [Font](#font)
  - [Colors](#colors)

<!-- /MarkdownTOC -->

## Installation

``` sh
cd ~/my-i3-status   # go to the directory you installed i3-status in
npm install --save i3-status-reporter-html
```

The window shown by the reporter should be a popup/floating window. Therefore you will need to add this to your i3 config:

```
for_window [class="i3-status-reporter"] floating enable,focus mode_toggle
```


## Configuration

``` yaml
main:
    [...]
reporter:
  module: i3-status-reporter-html
  timeout: 2
  barHeight: 28
  top: true
  margin: 0
  height: 200
  width: 600
  font:
    family: Source Code Pro
    size: 13
  colors:
    normalText: '#555555'
    normalBackground: '#272824'
    highlightText: '#e80088'
    highlightBackground: '#171814'
```

### Timeout

If you define a timeout value (in seconds) the reporter window will be closed automatically if you do not enter it with your mouse.

### barHeight

Defines the height of your i3 bar in pixels. The popup window will appear below/underneath your i3 bar, dependend on the location.

### Top

The popup window is located at the bottom by default. If you have your i3 bar on the top of the screen define top:true.


### Margin

Define a margin in pixels between your i3 bar and the reporter popup window.

### Height, Width

Define the height and width of the popup window. Defaults to a height of 200 and a width of 600. 

### Font

Define the font used to display text inside the popup window. Use the ```family``` attribute to define the font and the ```size``` to define the size of the text. 

### Colors

Define the default colors of the output. The module may override theese colors.