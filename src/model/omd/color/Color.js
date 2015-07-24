export default class Color {
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
