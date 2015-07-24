import uuid from 'uuid';

export default class Layer {
    constructor() {
        this.id = uuid.v4();
        this.name = '';
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
