import { getBasicLinePoints } from './algoritmo_basico.js';
import { getBresenhamLinePoints } from './algoritmo_bresenham.js';
import { getDDALinePoints } from './algoritmo_dda.js';

export function Point(X, Y){
    this.X = X;
    this.Y = Y;
}

function activateCanvas(){
    canvas.onmousemove = onBasicMove;
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    window.onresize = () => { 
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

function activateBasic(){
    canvas.onmousemove = onBasicMove;
}

function activateDDA(){
    canvas.onmousemove = onDDAMove;
}

function activateBresenham(){
    canvas.onmousemove = onBresenhamMove;
}

function onBasicMove(event){
    Points[1].X = Math.round(event.clientX - canvasBounds.left);
    Points[1].Y = Math.round(event.clientY - canvasBounds.top);

    drawLine(Points[0], Points[1], getBasicLinePoints);
}

function onDDAMove(event){
    Points[1].X = Math.round(event.clientX - canvasBounds.left);
    Points[1].Y = Math.round(event.clientY - canvasBounds.top);

    drawLine(Points[0], Points[1], getDDALinePoints);
}

function onBresenhamMove(event){
    Points[1].X = Math.round(event.clientX - canvasBounds.left);
    Points[1].Y = Math.round(event.clientY - canvasBounds.top);

    drawLine(Points[0], Points[1], getBresenhamLinePoints);
}


function onCanvasClick(event = new PointerEvent()){
    Points[0].X = Math.round(event.clientX - canvasBounds.left);
    Points[0].Y = Math.round(event.clientY - canvasBounds.top);

    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function drawPixel(cData, P){
    try{
        canvCtx.putImageData(cData, P.X, P.Y);
        canvCtx.fillRect(P.X, P.Y, 1, 1);
    } catch(e){ }
}

function drawLine(P1, P2, getLinePoints){
    const pixelData = canvCtx.createImageData(1, 1);
    const drawablePoints = getLinePoints(P1, P2);

    //console.log(`Dibujando desde (${P1.X}, ${P1.Y}) hasta (${P2.X}, ${P2.Y}).`);
    drawablePoints.forEach(P => drawPixel(pixelData, P));
}

document.getElementById("basic").onclick = activateBasic;
document.getElementById("dda").onclick = activateDDA;
document.getElementById("bresenham").onclick = activateBresenham;

const canvas = document.getElementById("canvas");
const canvasBounds = canvas.getBoundingClientRect();
const canvCtx = canvas.getContext("2d");

const Points = [
    new Point(Math.trunc(canvas.clientWidth/2), Math.trunc(canvas.clientHeight/2)),
    new Point(0, 0),
];

activateCanvas();