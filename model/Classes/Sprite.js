var fs = require('fs');
var PNG = require('pngjs').PNG;
const PixelMatrix = require('./PixelMatrix');

// noinspection JSCommentMatchesSignature
/**
 * @constructor
 * @param (String) imageUrl
 * @param (String) maskUrl
 */
module.exports = function Sprite(imageUrl, maskUrl) {
    const imageData = fs.readFileSync(imageUrl);
    const image = PNG.sync.read(imageData);

    this.imageMatrix = new PixelMatrix(image.width, image.height, image.data);
    this.maskMatrix = undefined;

    var that = this;

    if (maskUrl !== undefined) {
        const maskData = fs.readFileSync(maskUrl);
        const mask = PNG.sync.read(maskData);

        this.maskMatrix = new PixelMatrix(mask.width, mask.height, mask.data);
    } else {
        this.maskMatrix = this.imageMatrix;
    }

    /**
     * Get the drawObject of the Sprite.
     *
     * @param callback Callback for asynch use
     * @returns {*|{x: *, y: *}|{x1: *, y1: *, x2: *, y2: *}}
     */
    this.getDrawObject = function (callback) {
        if (callback) {
            that.imageMatrix.getDrawObject(callback);
        } else {
            return that.imageMatrix.getDrawObject();
        }
    };

    // noinspection JSUnusedGlobalSymbols
    this.getMaskMatrix = function (callback) {
        if (callback) {
            callback(that.maskMatrix);
        } else {
            return that.maskMatrix;
        }
    };

    // noinspection JSUnusedGlobalSymbols
    this.getImageMatrix = function (callback) {
        if (callback) {
            callback(that.imageMatrix);
        }  else {
            return that.imageMatrix;
        }
    }
};

