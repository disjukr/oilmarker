import uuid from 'uuid';

import Layer from './layer/Layer';

export default class Document {
    constructor() {
        this.id = uuid.v4();
        this.width = 0;
        this.height = 0;
        this.layers = new Layers();
    }
    toJSON() {
        return {
            id: this.id,
            width: this.width,
            height: this.height,
            layers: this.layers
        };
    }
    static fromJSON(json) {
        if (typeof json === 'string') {
            json = JSON.parse(json);
        }
        let newInstance = new Document();
        newInstance.id = json.id;
        newInstance.width = json.width;
        newInstance.height = json.height;
        newInstance.layers = Layers.fromJSON(json.layers);
        return newInstance;
    }
};

class Layers {
    constructor() {
        this._layers = [];
    }
    pushLayer(layer) {
        this._layers.push(layer);
    }
    get(index) {
        return this._layers[index];
    }
    [Symbol.iterator]() {
        return this._layers[Symbol.iterator]();
    }
    toJSON() {
        return this._layers.concat();
    }
    static fromJSON(json) {
        let newInstance = new Layers();
        newInstance._layers = json.map(layer => Layer.fromJSON(layer));
        return newInstance;
    }
}
