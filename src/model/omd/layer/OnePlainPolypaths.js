import Layer from './Layer';
import Stroke from '../stroke/Stroke';
import Fill from '../fill/Fill';
import PlainStroke from '../stroke/PlainStroke';
import PlainFill from '../fill/PlainFill';

import {union} from 'util/clipper-util';

function toD(polypath) {
    if (polypath.length < 3) return '';
    let copy = polypath.concat();
    let first = copy.shift();
    return `M${first.X},${first.Y} ${copy.map(coord => `L${coord.X},${coord.Y} `)} Z`;
}

export default class OnePlainPolypaths extends Layer {
    static type = 'one_plain_polypaths';
    constructor(name = '', stroke = Stroke.none, fill = PlainFill.black, polypaths = []) {
        super(name);
        if (!(stroke instanceof PlainStroke) && stroke !== Stroke.none)
            throw new Error('stroke must be PlainStroke or None');
        if (!(fill instanceof PlainFill) && fill !== Fill.none)
            throw new Error('fill must be PlainFill or None');
        this.polypaths = polypaths;
        this.stroke = stroke;
        this.fill = fill;
    }
    get d() {
        return this.polypaths.map(polypath => toD(polypath)).join(' ');
    }
    isPaintable() {
        return true;
    }
    paint(brush) {
        this.polypaths = union(this.polypaths, brush.toPolypaths());
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: OnePlainPolypaths.type,
            polypaths: this.polypaths,
            stroke: this.stroke,
            fill: this.fill
        });
    }
    static fromJSON(json) {
        let newInstance = new OnePlainPolypaths(
            Stroke.fromJSON(json.stroke),
            Fill.fromJSON(json.fill),
            json.polypaths
        );
        return newInstance;
    }
};

Layer.TYPE[OnePlainPolypaths.type] = OnePlainPolypaths;
