import Shape from './Shape';

const ONE = Math.PI + Math.PI;

export default class Circle extends Shape {
    constructor(x = 0, y = 0, radius = 1) {
        super();
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    toPolypaths() {
        let {x, y, radius} = this;
        let sideness = Math.max(Math.ceil(Math.sqrt(radius) * 5), 3);
        let polypath = new Array(sideness);
        for (let i = 0; i < sideness; ++i) {
            let t = (i / sideness) * ONE;
            polypath[i] = {
                X: Math.cos(t) * radius + x,
                Y: Math.sin(t) * radius + y
            };
        }
        return [polypath];
    }
};
