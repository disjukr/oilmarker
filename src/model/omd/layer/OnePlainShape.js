import Layer from './Layer';
import Stroke from '../stroke/Stroke';
import Fill from '../fill/Fill';
import PlainStroke from '../stroke/PlainStroke';
import PlainFill from '../fill/PlainFill';

export default class OnePlainShape extends Layer {
    static type = 'one_plain';
    constructor(stroke = Stroke.none, fill = PlainFill.black, d = '') {
        super();
        if (!(stroke instanceof PlainStroke) && stroke !== Stroke.none)
            throw new Error('stroke must be PlainStroke or None');
        if (!(fill instanceof PlainFill) && fill !== Fill.none)
            throw new Error('fill must be PlainFill or None');
        this.d = d; // svg path d attribute
        this.stroke = stroke;
        this.fill = fill;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: OnePlainShape.type,
            d: this.d,
            stroke: this.stroke,
            fill: this.fill
        });
    }
    static fromJSON(json) {
        let newInstance = new OnePlainShape();
        newInstance.d = json.d;
        newInstance.stroke = Stroke.fromJSON(json.stroke);
        newInstance.fill = Fill.fromJSON(json.fill);
        return newInstance;
    }
};

Layer.TYPE[OnePlainShape.type] = OnePlainShape;
