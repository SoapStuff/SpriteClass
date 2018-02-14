const Edge = require('./Edge');

module.exports = function Pixel(x, y, r, g, b, matrix) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;

    this.edges = [];

    for (var hor = x - 1; hor <= x + 1; hor++) {
        for (var ver = y - 1; ver <= y + 1; ver++) {
            if (hor === x && ver === y) continue;
            try {
                if (matrix[hor][ver] !== undefined) {
                    this.edges.push(new Edge(this, matrix[hor][ver]));
                }
            } catch (error) {
                if (!(error instanceof TypeError)) {
                    console.log(error);
                }
            }
        }
    }

    var hexR = this.r.toString(16);
    var hexG = this.g.toString(16);
    var hexB = this.b.toString(16);

    this.hex = "";
    this.hex += hexR.length === 2 ? hexR : "0" + hexR;
    this.hex += hexG.length === 2 ? hexG : "0" + hexG;
    this.hex += hexB.length === 2 ? hexB : "0" + hexB;

    this.getDrawObject = function () {
        return {
            x: this.x,
            y: this.y
        }
    };

    this.getHexadecimal = function () {
        return this.hex;
    };

    this.getEdges = function () {
        return this.edges;
    };

    this.getX = function () {
        return this.x;
    };

    this.getY = function () {
        return this.y;
    }
};