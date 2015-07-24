export default class Fill {
    toJSON() {
        return {
            type: 'undefined'
        };
    }
    static fromJSON(json) {
        let newInstance = Fill.TYPE[json.type].fromJSON(json);
        return newInstance;
    }
    static TYPE = {};
};

class None extends Fill {
    static type = 'none';
    toJSON() {
        return Object.assign({}, super.toJSON(), {
            type: None.type
        });
    }
    static fromJSON(json) {
        return Fill.none;
    }
}

Fill.TYPE[None.type] = None;
