const roundness = 1e3;
const e = 0.01;

module.exports = {
    random: function(min, max) {
        return Math.floor(Math.random() * (max-min)) + min;
    },

    round: function(n) {
        return ~~(n*roundness)/roundness;
    },

    zoomGraph: function(dis) {
        if (abs(dis) > maxDeltaBlockSize / wheelSmooth) dis = maxDeltaBlockSize;
        let delta = blockSize - dis * wheelSmooth;
        let _d = delta - standardBlockSize;

        if (abs(_d) > maxDeltaBlockSize) {
            blockSize = standardBlockSize;

            if (_d < 0) {
                unit = unit * 2;
            } else {
                unit = unit * 0.5;
            }
        } else {
            blockSize = delta;
        }
    },

    moveGraph: function() {
        if (refreshCoords) {
            oldMouseX = mouseX;
            oldMouseY = mouseY;
            refreshCoords = 0;
        }

        offsetX += mouseX - oldMouseX;
        offsetY += mouseY - oldMouseY;

        oldMouseX = mouseX;
        oldMouseY = mouseY;
    },

    parseEquation: function p(eq) {

        const dict = {
            pi:     'A',
            e:      'B',
            abs:    'C',
            ceil:   'D',
            round:  'E',
            floor:  'F',
            sqrt:   'G',
            log:    'H',
            cos:    'I',
            sin:    'J',
            tan:    'K',
            acos:   'L',
            asin:   'M',
            atan:   'N',
            ' ':    ''
        };

        const regExp = new RegExp(`${Object.keys(dict).join('|')}`, 'g');

        eq = eq.toLowerCase();
        eq = eq.replace(regExp, m => dict[m]);

        let _eq = '';
        let close = 0;
        let e = 0;
        let c;

        for (let i = 0; i < eq.length; i++) {
            c = eq[i];

            if (/[a-z\(]/i.test(c) || (!close && c === '|')) {
                if ((/[^\+\-\/\%\*\(\|\^C-Z]/.test(eq[i-1]) || (!close && eq[i-1] === '|')) && eq[i-1] !== undefined) _eq += '*';
            }
            if (c === '|') {
                _eq += close ? ')' : 'abs(';
                close = !close;
            }

            if (c === '^')
                _eq += '**';
            else if (c === '=') {
                _eq += '-(';
                e = 1;
            } else
                if (c !== '|') _eq += c;
        }

        _eq = _eq.replace(/[A-Z]/g, m => Object.keys(dict).find(key => dict[key] === m))

        return _eq + (e ? ')' : '');
    },

    solveEquation: function(eq, v) {
        // if (!/=/.test(eq))
        //     eq += '=0';
        //
        // eq = eq.replace('=', '-(') + ')';

        eq = eq.replace(/x/g, `(${v})`);

        return eval(eq);
    },

    newtonRaphson: function(f, _f, guess) {
        let old = null;
        let maxTries = 100;

        while (Math.abs(old - guess) > e && Math.abs(f.eval(guess)) > e) {
            // let _eq1 = this.parseEquation(f.toString()).replace('x', '('+guess+')');
            // let _eq2 = this.parseEquation(_f.toString()).replace('x', '('+guess+')');
            old = guess;
            guess = guess - f.eval(guess) / _f.eval(guess);

            console.log(f.eval(guess), guess);

            if (!maxTries)
                return null;

            maxTries--;
        }

        return guess;
    },

    findRoots: function(f) {
        const roots = [];
        let p = new Polynomial(f);
        let d = p.derive();

        let guess = 1;

        while (p.toString() != 0) {
            let root = this.newtonRaphson(p, d, guess);

            if (root === null) {
                console.log(':(');
                break;
            }

            root = this.round(root);

            roots.push(root);

            let _d = root < 0 ? 'x'+root : 'x+' + root;
            p = p.div(root);
            console.log(p.toString());
            d = p.derive();
        }

        return roots;
    }
}
