// noinspection JSCommentMatchesSignature
/**
 * @constructor
 * @param (Pixel) pixel1 The first pixel of the edge
 * @param (Pixel) pixel2 The second pixel of the edge
 */
module.exports = function Edge(pixel1, pixel2) {
    this.pixel1 = pixel1;
    this.pixel2 = pixel2;
};