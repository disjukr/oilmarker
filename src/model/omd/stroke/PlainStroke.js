import Stroke from './Stroke';
import Fill from '../fill/Fill';
import PlainFill from '../fill/PlainFill';

export default class PlainStroke extends Stroke {
    static type = 'plain';
    constructor(fill = PlainFill.black, width = 1) {
        super();
        if (!(fill instanceof PlainFill)) throw new Error('fill must be PlainFill');
        this.fill = fill;
        this.width = width; // pixel unit
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: PlainStroke.type,
            fill: this.fill,
            width: this.width
        });
    }
    static fromJSON(json) {
        let newInstance = new PlainStroke();
        newInstance.fill = Fill.fromJSON(json.fill);
        newInstance.width = json.width;
        return newInstance;
    }
};

Stroke.TYPE[PlainStroke.type] = PlainStroke;
