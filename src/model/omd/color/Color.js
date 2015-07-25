export default class Color {
    get opacity() {
        throw new Error('not implemented');
    }
    get hex6() {
        throw new Error('not implemented');
    }
    toJSON() {
        return {
            type: 'undefined'
        };
    }
    static fromJSON(json) {
        let newInstance = Color.TYPE[json.type].fromJSON(json);
        return newInstance;
    }
    static TYPE = {};
};
