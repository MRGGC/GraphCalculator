module.exports = (eq) => {

    let p = f.parseEquation(eq[0]);
    let v, a, y;
    let hasText = 0;

    stroke(...eq[1]);

    noFill();
    beginShape();

    for (let x = -width/2 - offsetX; x <= -offsetX + width/2; x++) {

        v = (x / blockSize) * unit;
        a = f.solveEquation(p, v);
        y = a * -blockSize * blockCount / (unit * unitP);

        if (y < -offsetY - height/2 || y > -offsetY + height/2) {
            vertex(x, y);
            endShape();

            beginShape();
            // vertex(x, y);

            continue;
        }

        if (!hasText && y > -offsetY - height/2 + 35 && y < -offsetY + height/2 - 35) {
            hasText = 1;

            strokeWeight(0.9);
            let _x = x + letterSpaceLine * eq[0].length;
            let _y = y + letterSpaceLine * eq[0].length;

            text(eq[0].toLowerCase(), _x, _y);
            strokeWeight(2);
        }

        vertex(x, y);
    }

    endShape();
    fill(0);

}
