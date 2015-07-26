import uuid from 'uuid';

export default class Layer {
    constructor(name = '') {
        this.id = uuid.v4();
        this.name = name;
    }
    isPaintable() {
        return false;
    }
    paint(brush) { // brush is vector shape
        throw new Error('not allowed');
    }
    toJSON() {
        return {
            type: 'undefined',
            id: this.id,
            name: this.name
        };
    }
    static fromJSON(json) {
        let newInstance = Layer.TYPE[json.type].fromJSON(json);
        newInstance.id = json.id;
        return newInstance;
    }
    static TYPE = {};
};
