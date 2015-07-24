export default class Stroke {
    toJSON() {
        return {
            type: 'undefined'
        };
    }
    static fromJSON(json) {
        let newInstance = Stroke.TYPE[json.type].fromJSON(json);
        return newInstance;
    }
    static TYPE = {};
};

class None extends Stroke {
    static type = 'none';
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: None.type
        });
    }
    static fromJSON(json) {
        return Stroke.none;
    }
}

Stroke.TYPE[None.type] = None;
Stroke.none = new None();
