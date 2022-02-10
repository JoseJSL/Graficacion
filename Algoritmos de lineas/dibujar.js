import { getBasicLinePoints } from './algoritmo_basico.js';
import { getBresenhamLinePoints } from './algoritmo_bresenham.js';
import { getDDALinePoints } from './algoritmo_dda.js';
import { Stopwatch } from './cronometro.js';

export function Point(X, Y){
    this.X = X;
    this.Y = Y;
}

function activateCanvas(){
    canvas.onmousemove = onBasicMove;
    canvas.addEventListener("click", onCanvasClick, false);
    canvas.style.width = "calc(100% - 100px)";
    canvas.style.height = "calc(100% - 100px)";
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    window.onresize = () => { 
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
}

function activateBasic(){
    canvas.onmousemove = onBasicMove;
    activateCanvas();
}

function activateDDA(){
    canvas.onmousemove = onDDAMove;
    activateCanvas();
}

function activateBresenham(){
    canvas.onmousemove = onBresenhamMove;
    activateCanvas();
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

    clearCanvas();
}

function drawPixel(cData, P){
    try{
        canvCtx.putImageData(cData, P.X, P.Y);
        canvCtx.fillRect(P.X, P.Y, 1, 1);
    } catch(e){ }
}

async function drawLine(P1, P2, getLinePoints){
    const pixelData = canvCtx.createImageData(1, 1);
    const drawablePoints = getLinePoints(P1, P2);

    drawablePoints.forEach(P => drawPixel(pixelData, P));
    await Pause();
}

function clearCanvas(){
    canvCtx.clearRect(0, 0, canvas.width, canvas.height); 
}

document.getElementById("basic").onclick = activateBasic;
document.getElementById("dda").onclick = activateDDA;
document.getElementById("bresenham").onclick = activateBresenham;
document.getElementById("btnTest").onclick = testAll;

const canvas = document.getElementById("canvas");
const canvasBounds = canvas.getBoundingClientRect();
const canvCtx = canvas.getContext("2d");

const Points = [
    new Point(Math.trunc(canvas.clientWidth/2), Math.trunc(canvas.clientHeight/2)),
    new Point(0, 0),
];

activateCanvas();

//Sección del test
async function testAll(){
    canvas.removeEventListener("click", onCanvasClick, false);
    canvas.onmousemove = null;

    canvas.width = 1000;
    canvas.height = 1000;

    canvas.style.width = "1000px";
    canvas.style.height = "1000px";

    await testMethod(getBasicLinePoints, "basicStopwatch");
    await testMethod(getDDALinePoints, "ddaStopwatch");
    await testMethod(getBresenhamLinePoints, "bresenhamStopwatch");
}

async function testMethod(drawMethod, spanID){
    const input = document.getElementById("space");
    const space = input.value ? parseInt(input.value) : 2;

    const sw = new Stopwatch(document.getElementById(spanID));
    clearCanvas();
    sw.Start();
    await testVertical(drawMethod, space);
    await testHorizontal(drawMethod, space);
    await testBottomLeft(drawMethod, space);
    await testBottomRight(drawMethod, space);
    sw.Stop();
}

async function testHorizontal(drawMethod, space){
    var PointL = new Point(0, 0);
    var PointR = new Point(1000, 0);
    
    for(var i = 0; i < 1000; i+= space){
        await drawLine(PointL, PointR, drawMethod);
        PointL.Y += space;
        PointR.Y += space;
    }
}

async function testVertical(drawMethod, space){
    var PointL = new Point(0, 0);
    var PointR = new Point(0, 1000);
    
    for(var i = 0; i < 1000; i+= space){
        await drawLine(PointL, PointR, drawMethod);
        PointL.X += space;
        PointR.X += space;
    }
}

async function testBottomLeft(drawMethod, space){
    var PointL = new Point(0, 1000);
    var PointR = new Point(0, 1000);
    
    for(var i = 0; i < 1000; i+= space){
        await drawLine(PointL, PointR, drawMethod);
        PointL.Y -= space;
        PointR.X += space;
    }
}

async function testBottomRight(drawMethod, space){
    var PointL = new Point(1000, 0);
    var PointR = new Point(1000, 0);
    
    for(var i = 0; i <= 1000; i+= space){
        await drawLine(PointL, PointR, drawMethod);
        PointL.Y += space;
        PointR.X -= space;
    }
}

async function Pause(){
    return new Promise(r => setTimeout(r, 0));
}