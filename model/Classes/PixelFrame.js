const Pixel = require("./Pixel");

/**
 * Method that adds the points to draw to the vertices array from a pixel.
 *
 * @param {[]} vertices The array of drawing vertices
 * @param {Pixel} pixel The pixel to draw
 * @param {int} width The width of the canvas
 * @param {int} height The height of the canvas
 */
var createPixelDrawArray = function (vertices, pixel, width, height) {
    var x = (pixel.x / width) - 1;
    var y = (-pixel.y / height) + 1;
    vertices.push(x);
    vertices.push(y);
    vertices.push(0.0);
};

/**
 * Method that adds the points to draw to the vertices array from a pixel.
 *
 * @param {[]} vertices The array of drawing vertices
 * @param {Edge} edge The pixel to draw
 * @param {int} width The width of the canvas
 * @param {int} height The height of the canvas
 */
var createEdgeDrawArray = function (vertices, edge, width, height) {
    var x1 = (edge.pixel1.x / width) - 1;
    var y1 = (-edge.pixel1.y / height) + 1;
    var x2 = (edge.pixel2.x / width) - 1;
    var y2 = (-edge.pixel2.y / height) + 1;
    vertices.push(x1);
    vertices.push(y1);
    vertices.push(0);
    vertices.push(x2);
    vertices.push(y2);
    vertices.push(0);
};

// noinspection JSValidateJSDoc
/**
 * @constructor
 * @param {double} width Width of the image
 * @param {double} height Height of the image
 * @param {FileBuffer} buffer File buffer for the image
 */
module.exports = function PixelFrame(width, height, buffer) {
    this.matrix = [];
    this.edges = [];
    this.pixels = [];

    this.addEdge = function (edge) {
        this.edges.push(edge);
    };

    var x = 0;
    var y = 0;

    // noinspection JSDuplicatedDeclaration
    for (var i = 0; i < width * height * 4; i += 4) {
        x = (i / 4) % width;
        y = Math.floor(i / (height * 4));

        if (this.matrix[x] === undefined) {
            this.matrix[x] = [];
        }

        if (buffer[i + 3] !== 0) {
            var pixel = new Pixel(x, y, buffer[i], buffer[i + 1], buffer[i + 2], this.matrix, this);
            this.matrix[x][y] = pixel;
            this.pixels.push(pixel);
        }
    }

    /**
     * Get the drawObject of the PixelFrame.
     *
     * @param body Body containing canvas details
     * @param callback Callback for asynch use
     * @returns {*} The drawObject
     */
    this.getDrawObject = function (body, callback) {
        var drawObject = {};
        for (var i = 0; i < this.pixels.length; i++) {
            if (!drawObject[this.pixels[i].hex]) {
                drawObject[this.pixels[i].hex] = [];
            }
            createPixelDrawArray(drawObject[this.pixels[i].hex], this.pixels[i], body.width, body.height);
        }
        if (callback) {
            callback(drawObject);
        } else {
            return drawObject;
        }
    }
};