import Shape from './Shape';
import Circle from './Circle';

import {union} from 'util/clipper-util';

export default class Pill extends Shape {
    constructor(start, end) {
        super();
        if (!(start instanceof Circle)) throw new Error('start must be Circle');
        if (!(end instanceof Circle)) throw new Error('end must be Circle');
        this._start = start;
        this._end = end;
        this._tangents = new Tangents(start, end);
    }
    set start(value) {
        this._start = this._tangents.start = value;
    }
    set end(value) {
        this._end = this._tangents.end = value;
    }
    get start() {
        return this._start;
    }
    get end() {
        return this._end;
    }
    toPolypaths() {
        let [start, end, tangents] = [
            this._start.toPolypaths(),
            this._end.toPolypaths(),
            this._tangents.toPolypaths()
        ];
        return union(union(start, tangents), end);
    }
};


// https://en.wikipedia.org/wiki/Tangent_lines_to_circles
// https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Tangents_between_two_circles
class Tangents extends Shape {
    constructor(start, end) {
        super();
        if (!(start instanceof Circle)) throw new Error('start must be Circle');
        if (!(end instanceof Circle)) throw new Error('end must be Circle');
        this.start = start;
        this.end = end;
    }
    toPolypaths() {
        let res = [[,,,,], [,,,,]];
        let [x1, y1, r1, x2, y2, r2] = [
            this.start.x, this.start.y, this.start.radius,
            this.end.x, this.end.y, this.end.radius
        ];
        let dsq =(x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        if (dsq <= (r1 - r2) * (r1 - r2)) return [];
        let d = Math.sqrt(dsq);
        let vx = (x2 - x1) / d;
        let vy = (y2 - y1) / d;
        let i = 0;
        outside: for (let sign1 = +1; sign1 >= -1; sign1 -= 2) {
            let c = (r1 - sign1 * r2) / d;
            if (c * c > 1) continue;
            let h = Math.sqrt(Math.max(0, 1 - c * c));
            for (let sign2 = +1; sign2 >= -1; sign2 -= 2) {
                let nx = vx * c - sign2 * h * vy;
                let ny = vy * c + sign2 * h * vx;
                let a = res[i++];
                a[0] = x1 + r1 * nx;
                a[1] = y1 + r1 * ny;
                a[2] = x2 + sign1 * r2 * nx;
                a[3] = y2 + sign1 * r2 * ny;
                if (i > 1) break outside;
            }
        }
        return [[
            {X: res[0][0], Y: res[0][1]},
            {X: res[0][2], Y: res[0][3]},
            {X: res[1][2], Y: res[1][3]},
            {X: res[1][0], Y: res[1][1]}
        ]];
    }
}
