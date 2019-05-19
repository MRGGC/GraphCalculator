let x0, y0;
let x, y;
const colors = [12, 25, 154, 225];

function lineUpX(_x) {
    x0 = -~~(_x / blockSize)*blockSize;

    for (x = x0; x <= x0 + width+1; x += blockSize) {
        if ((x / blockSize) % blockCount === 0) {
            stroke(colors[2]);
            strokeWeight(1);
        } else {
            stroke(colors[3]);
            strokeWeight(0.5);
        }

        line( x,  -height/2 - offsetY,
                x,  height/2 - offsetY)
    }
}

function lineUpY(_y) {
    y0 = -~~(_y / blockSize)*blockSize;

    for (y = y0; y <= y0 + height+1; y += blockSize) {
        if ((y / blockSize) % blockCount === 0) {
            stroke(colors[2]);
            strokeWeight(1);
        } else {
            stroke(colors[3]);
            strokeWeight(0.5);
        }

        line( -width/2 - offsetX, y,
                width/2 - offsetX, y);
    }
}

module.exports = () => {

    let _x = width/2 + offsetX, _y = height/2 + offsetY;
    translate(_x, _y);

    lineUpX(_x);
    lineUpY(_y);

    // Stroking Ox and Oy
    strokeWeight(1.7);
    stroke(colors[1]);

    line(0, -height/2 - offsetY, 0, height/2 - offsetY);
    line(-width/2 - offsetX, 0, width/2 - offsetX, 0);

    // Stroking the numbers
    strokeWeight(0.1);
    stroke(colors[0]);
    textAlign(CENTER, TOP);

    for (x = x0; x <= x0 + width+1; x += blockSize) {
        if ((x / blockSize) % blockCount === 0) {
            if (x) text(unit * (x/blockSize), x, 0);
        }
    }

    textAlign(RIGHT, CENTER);
    for (y = y0; y <= y0 + height+1; y += blockSize) {
        if ((y / blockSize) % blockCount === 0) {
            if (y) text(-unit * (y/blockSize), -4, y);
        }
    }

    textAlign(RIGHT, TOP);
    text(0, -4, 0);

}
