import Color from './Color';

export default class RGBA extends Color {
    static type = 'rgba';
    constructor(r, g, b, a) {
        super();
        this.r = r; // 0 ~ 255
        this.g = g; // 0 ~ 255
        this.b = b; // 0 ~ 255
        this.a = a; // 0 ~ 255
    }
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: RGBA.type,
            r: this.r,
            g: this.g,
            b: this.b,
            a: this.a
        });
    }
    static fromJSON(json) {
        let newInstance = new RGBA();
        newInstance.r = json.r;
        newInstance.g = json.g;
        newInstance.b = json.b;
        newInstance.a = json.a;
        return newInstance;
    }
};

RGBA.transparent = new RGBA(0, 0, 0, 0);
RGBA.black = new RGBA(0, 0, 0, 255);

Color.TYPE[RGBA.type] = RGBA;
