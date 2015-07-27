export default class Tool {
    constructor() {
        this.layer = null;
    }
    setLayer(layer) {
        this.layer = layer;
    }
    down(pointer) { throw new Error('not implemented'); }
    move(pointer) { throw new Error('not implemented'); }
    up(pointer) { throw new Error('not implemented'); }
    tick() { throw new Error('not implemented'); }
};
