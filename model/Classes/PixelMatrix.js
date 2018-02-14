const Pixel = require("./Pixel");

module.exports = function PixelMatrix(width, height, buffer) {
    this.matrix = [];
    this.edges = [];
    this.pixels = [];
    this.drawObject = {
        points : {},
        lines : []
    };

    var x = 0;
    var y = 0;

    // noinspection JSDuplicatedDeclaration
    for (var i = 0; i < width * height * 4; i += 4) {
        x = (i / 4) % 32;
        y = Math.floor(i / 128);

        if (this.matrix[x] === undefined) {
            this.matrix[x] = [];
        }

        if (buffer[i + 3] !== 0) {
            var pixel = new Pixel(x, y, buffer[i], buffer[i + 1], buffer[i + 2], this.matrix);
            this.matrix[x][y] = pixel;
            this.pixels.push(pixel);
            if (this.drawObject["points"][pixel.getHexadecimal()] === undefined) {
                this.drawObject["points"][pixel.getHexadecimal()] = [];
            }
            this.drawObject["points"][pixel.getHexadecimal()].push(pixel.getDrawObject());
            this.edges = this.edges.concat(pixel.getEdges());
        }
    }

    // noinspection JSDuplicatedDeclaration
    for (var i = 0; i < this.edges.length; i++) {
        this.drawObject["lines"].push(this.edges[i].getDrawObject());
    }

    this.getDrawObject = function (callback) {
        if (callback) {
            callback(this.drawObject);
        } else {
            return this.drawObject;
        }
    }
};