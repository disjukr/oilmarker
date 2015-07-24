import Layer from './Layer';
import Stroke from '../stroke/Stroke';
import Fill from '../fill/Fill';
import PlainStroke from '../stroke/PlainStroke';
import PlainFill from '../fill/PlainFill';

export default class OneShape extends Layer {
    static type = 'one';
    constructor() {
        super();
        this.d = ''; // svg path d attribute
        this.stroke = PlainStroke.none;
        this.fill = PlainFill.black;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: OneShape.type,
            d: this.d,
            stroke: this.stroke,
            fill: this.fill
        });
    }
    static fromJSON(json) {
        let newInstance = new OneShape();
        newInstance.d = json.d;
        newInstance.stroke = Stroke.fromJSON(json.stroke);
        newInstance.fill = Fill.fromJSON(json.fill);
        return newInstance;
    }
};

Layer.TYPE[OneShape.type] = OneShape;
