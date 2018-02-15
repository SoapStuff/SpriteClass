const Edge = require('./Edge');

// noinspection JSCommentMatchesSignature
/**
 * @constructor
 * @param (double) x X coordinate of the pixel
 * @param (double) y Y coordinate of the pixel
 * @param (double) r Red color value of the pixel
 * @param (double) g Green color value of the pixel
 * @param (double) b Blue color value of the pixel
 * @param (pixel[][]) matrix Matrix that the pixel is in
 * @param (PixelFrame) pixelFrame The pixelFrame object that creates the pixel
 */
module.exports = function Pixel(x, y, r, g, b, matrix, pixelFrame) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.pixelFrame = pixelFrame;

    var edges = [];
    var edgeCount = 0;

    for (var hor = x - 1; hor <= x + 1; hor++) {
        for (var ver = y - 1; ver <= y + 1; ver++) {
            if (hor === x && ver === y) continue;
            try {
                if (matrix[hor][ver] !== undefined) {
                    var edge = new Edge(this, matrix[hor][ver]);
                    edges.push(edge);
                    edgeCount++;
                    matrix[hor][ver].edges.push(edge);
                    matrix[hor][ver].edgeCount++;
                    this.pixelFrame.edges.push(edge);
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

    this.edgeCount = edgeCount;
    this.edges = edges;
};