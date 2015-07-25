import Color from './Color';

function hex2(ff) {
    let x = Math.round(ff);
    return (x >= 255) ? 'ff' :
           (x <= 0)   ? '00' :
           (x < 16)   ? '0' + x.toString(16) : x.toString(16);
}

export default class RGBA extends Color {
    static type = 'rgba';
    constructor(r, g, b, a) {
        super();
        this.r = r; // 0 ~ 255
        this.g = g; // 0 ~ 255
        this.b = b; // 0 ~ 255
        this.a = a; // 0 ~ 255
    }
    get opacity() {
        return this.a / 255;
    }
    get hex6() {
        return `#${hex2(this.r)}${hex2(this.g)}${hex2(this.b)}`;
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
