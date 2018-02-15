var fs = require('fs');
var PNG = require('pngjs').PNG;
const PixelFrame = require('./PixelFrame');

// noinspection JSCommentMatchesSignature
/**
 * @constructor
 * @param (String) imageUrl
 * @param (String) maskUrl
 */
module.exports = function Sprite(imageUrl, maskUrl) {
    const imageData = fs.readFileSync(imageUrl);
    const image = PNG.sync.read(imageData);

    this.imageFrame = new PixelFrame(image.width, image.height, image.data);
    this.maskFrame = undefined;

    var that = this;

    if (maskUrl !== undefined) {
        const maskData = fs.readFileSync(maskUrl);
        const mask = PNG.sync.read(maskData);

        this.maskFrame = new PixelFrame(mask.width, mask.height, mask.data);
    } else {
        this.maskFrame = this.imageFrame;
    }

    /**
     * Get the drawObject of the Sprite.
     *
     * @param body Body from request containing canvas details
     * @param callback Callback for asynch use
     * @returns {*|{x: *, y: *}|{x1: *, y1: *, x2: *, y2: *}}
     */
    this.getDrawObject = function (body, callback) {
        if (callback) {
            that.imageFrame.getDrawObject(body, callback);
        } else {
            return that.imageFrame.getDrawObject(body);
        }
    };

    // noinspection JSUnusedGlobalSymbols
    this.getMaskMatrix = function (callback) {
        if (callback) {
            callback(that.maskFrame);
        } else {
            return that.maskFrame;
        }
    };

    // noinspection JSUnusedGlobalSymbols
    this.getImageMatrix = function (callback) {
        if (callback) {
            callback(that.imageFrame);
        } else {
            return that.imageFrame;
        }
    }
};

