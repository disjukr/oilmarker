import Fill from '../fill/Fill';
import Color from '../color/Color';
import RGBA from '../color/RGBA';

export default class PlainFill extends Fill {
    static type = 'plain';
    constructor(fillColor = RGBA.black) {
        super();
        if (!(fillColor instanceof RGBA)) throw new Error('fillColor must be RGBA');
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
    static red = new PlainFill(RGBA.red);
    static green = new PlainFill(RGBA.green);
    static blue = new PlainFill(RGBA.blue);
};

Fill.TYPE[PlainFill.type] = PlainFill;
