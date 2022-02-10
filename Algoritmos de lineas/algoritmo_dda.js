import { Point } from './dibujar.js';

export function getDDALinePoints(P1, P2){
    const DX = P2.X - P1.X;
    const DY = P2.Y - P1.Y;

    return Math.abs(DX) > Math.abs(DY) ? 
        calcPoints(P1.X, P2.X, P1.Y, (DY / DX * (DX < 0 ? -1 : 1)), newPointX): 
        calcPoints(P1.Y, P2.Y, P1.X, (DX / DY * (DY < 0 ? -1 : 1)), newPointY);
}

const newPointX = (x, y) => new Point(x, y);
const newPointY = (y, x) => new Point(x, y);

function calcPoints(from, to, last, M, newPointMethod){
    var Points = [];
    const inc = from < to ? 1 : -1;

    while(from != to) {
        Points.push(newPointMethod(from, Math.round(last += M)));
        from += inc;
    }

    return Points;
}