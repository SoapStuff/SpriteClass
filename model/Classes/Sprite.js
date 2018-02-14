var fs = require('fs');
var PNG = require('pngjs').PNG;
const PixelMatrix = require('./PixelMatrix');

module.exports = function Sprite(imageUrl, maskUrl) {
    const imageData = fs.readFileSync(imageUrl);
    const image = PNG.sync.read(imageData);

    this.imageMatrix = new PixelMatrix(image.width, image.height, image.data);


    this.getDrawObject = function (callback) {
        if (callback) {
            this.imageMatrix.getDrawObject(callback);
        } else {
            return this.imageMatrix.getDrawObject();
        }
    }
};

