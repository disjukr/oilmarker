import Brush from './Brush';

import Circle from '../../shape/Circle';
import Pill from '../../shape/Pill';

export default class CircleBrush extends Brush {
    constructor(radius) {
        super();
        this.radius = radius;
        this._lastX = 0;
        this._lastY = 0;
        this._lastRadius = 0;
        this._startCircle = new Circle();
        this._endCircle = new Circle();
        this._pill = new Pill(this._startCircle, this._endCircle);
    }
    toPolypaths() {
        return this._pill.toPolypaths();
    }
    down(pointer) {
        if (this.layer.isPaintable()) {
            let radius = pointer.pressure * this.radius;
            this._startCircle.x = this._endCircle.x = pointer.x;
            this._startCircle.y = this._endCircle.y = pointer.y;
            this._startCircle.radius = this._endCircle.radius = radius;
            this._lastX = pointer.x;
            this._lastY = pointer.y;
            this._lastRadius = radius;
            this.layer.paint(this);
        }
    }
    move(pointer) {
        if (this.layer.isPaintable()) {
            let radius = pointer.pressure * this.radius;
            this._startCircle.x = this._lastX;
            this._startCircle.y = this._lastY;
            this._startCircle.radius = this._lastRadius;
            this._endCircle.x = pointer.x;
            this._endCircle.y = pointer.y;
            this._endCircle.radius = radius;
            this._lastX = pointer.x;
            this._lastY = pointer.y;
            this._lastRadius = radius;
            this.layer.paint(this);
        }
    }
    up(pointer) {
        void 0;
    }
};
