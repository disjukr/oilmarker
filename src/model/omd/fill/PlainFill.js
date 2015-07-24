import Fill from '../fill/Fill';
import Color from '../color/Color';
import RGBA from '../color/RGBA';

export default class PlainFill extends Fill {
    static type = 'plain';
    constructor(fillColor = RGBA.black) {
        super();
        this.fillColor = fillColor;
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: PlainFill.type,
            fillColor: this.fillColor
        });
    }
    static fromJSON(json) {
        let newInstance = new PlainFill();
        newInstance.fillColor = Color.fromJSON(json.fillColor);
        return newInstance;
    }
    static black = new PlainFill(RGBA.black);
};

Fill.TYPE[PlainFill.type] = PlainFill;
