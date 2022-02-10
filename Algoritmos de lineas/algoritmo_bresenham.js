import { Point } from './dibujar.js';

export function getBresenhamLinePoints(P1, P2){
    var DX = P2.X - P1.X;
    var DY = P2.Y - P1.Y;
    
    const incX = DX < 0 ? -1 : 1;
    const incY = DY < 0 ? -1 : 1;

    const inc2DY = 2 * DY;
    const inc2DX = 2 * DX;

    return DX > DY ? 
        calcBiggerX(new Point(P1.X -incX, P1.Y - incY), P2.X, (2 * DX - DY), inc2DX, inc2DY, incX, incY):
        calcBiggerY(new Point(P1.X -incX, P1.Y - incY), P2.Y, (2 * DY - DX), inc2DX, inc2DY, incX, incY);
}

function calcBiggerX(P1, to, PK, inc2DY, inc2DX, incX, incY){
    var Points = [];
    
    while(P1.X != to){
        if(PK < 0){
            PK += inc2DX;
            Points.push(new Point(P1.X+=incX, P1.Y));
        } else {
            PK += inc2DX - inc2DY;
            Points.push(new Point(P1.X+=incX, P1.Y+=incY));
        }
    }

    return Points;
}

function calcBiggerY(P1, to, PK, inc2DY, inc2DX, incX, incY){
    var Points = [];
    
    while(P1.Y != to){
        if(PK < 0){
            PK += inc2DY;
            Points.push(new Point(P1.X, P1.Y+=incY));
        } else {
            PK += inc2DY - inc2DX;
            Points.push(new Point(P1.X+=incX, P1.Y+=incY));
        }
    }

    return Points;
}