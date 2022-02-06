import { Point } from './dibujar.js';

const calcY = (X, M, B) => Math.round(M * X + B);
const calcX = (Y, M, B) => Math.round((Y - B) / M);

function calcBiggerX(P1, P2, M, B){
    var Points = [];
    var inc = P2.X < P1.X ? -1 : 1;
    var X = P1.X - inc;

    while(X != P2.X) Points.push(new Point(X+=inc, calcY(X, M, B)));

    return Points;
}

function calcBiggerY(P1, P2, M, B){
    var Points = [];
    var inc = P2.Y < P1.Y ? -1 : 1;
    var Y = P1.Y - inc;

    while(Y != P2.Y) Points.push(new Point(calcX(Y+=inc, M, B), Y));

    return Points;
}

export function getBasicLinePoints(P1, P2){
    const DX = P1.X - P2.X;
    const DY = P1.Y - P2.Y;

    const M = DY / DX;
    const B = P1.Y - M * P1.X;

    return Math.abs(DX) > Math.abs(DY) ? calcBiggerX(P1, P2, M, B) : calcBiggerY(P1, P2, M, B);
}