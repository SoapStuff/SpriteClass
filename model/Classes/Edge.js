// noinspection JSCommentMatchesSignature
/**
 * @constructor
 * @param (Pixel) pixel1 The first pixel of the edge
 * @param (Pixel) pixel2 The second pixel of the edge
 */
module.exports = function Edge(pixel1, pixel2) {
    this.pixel1 = pixel1;
    this.pixel2 = pixel2;

    /**
     * Returns draw object for the edge.
     *
     * @returns {{x1: *, y1: *, x2: *, y2: *}}
     */
    this.getDrawObject = function () {
        return {
            x1 : this.pixel1.getX(),
            y1 : this.pixel1.getY(),
            x2 : this.pixel2.getX(),
            y2 : this.pixel2.getY()
        }
    };
};