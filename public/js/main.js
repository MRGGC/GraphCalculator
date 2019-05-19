const electron = require('electron');
const {ipcRenderer} = electron;
const Polynomial = require('polynomial');
const renderGrid = require('./js/gridRenderer');
const plotGraph = require('./js/plotGrapher');
const f = require('./js/funcs');

const pi = Math.PI;
const e = Math.E;

const WIDTH = 485;
const HEIGHT = 485;

const wheelSmooth = 0.5;

const blockCount = 5;
const maxDeltaBlockSize = 10;
const standardBlockSize = 20;
const maxWheel = 2;

const colors = [[214, 124, 124], [110, 155, 199], [116, 170, 125], [239, 158, 103], [143, 124, 190], [0, 0, 0]];

const unitP = 5;

const letterSpaceLine = 6;

let colorIndex = 0;

let blockSize = standardBlockSize;

let unit = 1/5;

let offsetX = 0, offsetY = 0;

let oldMouseX = null, oldMouseY = null;
let refreshCoords = 1;

let aMode;

let _last = [];

function preload() {
    aMode = DEGREES;
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    angleMode(aMode);
}

function draw() {
    background(255);
    renderGrid();

    if (!mouseIsPressed) refreshCoords = 1;

    for (let k of _last) {
        plotGraph(k);
    }
}

function mouseDragged() {
    f.moveGraph();
}

function mouseWheel(event) {
    f.zoomGraph(event.delta);
}

ipcRenderer.on('equation', (e, eq) => {
    _last.push([eq, colors[colorIndex]]);
    colorIndex = (colorIndex + 1) % (colors.length - 1);
});
