module.exports = function Edge(pixel1, pixel2) {
    this.pixel1 = pixel1;
    this.pixel2 = pixel2;

    this.getDrawObject = function () {
        return {
            x1 : this.pixel1.getX(),
            y1 : this.pixel1.getY(),
            x2 : this.pixel2.getX(),
            y2 : this.pixel2.getY()
        }
    };
};