import ClipperLib from 'clipper-lib';

export function clean(a, distance = 1.1) {
    return ClipperLib.Clipper.CleanPolygons(a, distance);
};

export function union(a, b) {
    let result = new ClipperLib.Paths();
    let c = new ClipperLib.Clipper();
    c.AddPaths(a, ClipperLib.PolyType.ptSubject, true);
    c.AddPaths(b, ClipperLib.PolyType.ptClip, true);
    c.Execute(ClipperLib.ClipType.ctUnion, result);
    return result;
};
