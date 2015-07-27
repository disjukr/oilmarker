export default class Pointer {
    constructor(x = 0, y = 0, pressure = 1, tiltX = 0, tiltY = 0) {
        this.x = x;
        this.y = y;
        this.pressure = pressure;
        this.tiltX = tiltX;
        this.tiltY = tiltY;
    }
};
