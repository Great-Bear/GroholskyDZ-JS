const cIndexInt = 5;
const cCountSeconds = 60;
const cCountLineSeconds = cCountSeconds;
const cCountHour = 12;
const cPadding = 20;
const cSuzeRect = 40;
const cWidthLine = 200;
const cLengthLine = 30;
const cSizeInt = 12;
const cCorrectFactorInt = -20;
const cRadiusLittleCircle = 10;
const cArrowSecondsColor = 'green';
const cArrowMinutesColor = 'blue';
const cArrowHourColor = 'red';
const cStepMinut = 0.166666667;
const cStepHour = 0.0333333333;
const cWidthArrowSecfactor = 120;
const cLengthArrowSecFactor = 35;
const cWidthArrowMinfactor = 40;
const cLengthArrowMinutFactor = 55;
const cWidthArrowHourfactor = 40;
const cLengthArrowHourFactor = 4.2;
let gArrWidthSec;
let gArrWidthMin;
let gArrWidthHour;
function PrintClock(canvasElem){
    let borderWidth = 10;
    let widthWindow = document.documentElement.clientWidth;
    let heightWindow = document.documentElement.clientHeight; 
    let diametr = -cPadding + borderWidth;
    widthWindow < heightWindow ? diametr += widthWindow : diametr += heightWindow;
    let radius = diametr / 2 - cPadding; 
    canvasElem.width = canvasElem.height = diametr;
    canvasMin.width = canvasMin.height = diametr;
    canvasSec.width = canvasSec.height = diametr;
    canvasHour.width = canvasHour.height = diametr;
    gArrWidthSec = diametr / cWidthArrowSecfactor;
    gArrWidthMin = diametr / cWidthArrowMinfactor;
    gArrWidthHour = diametr / cWidthArrowHourfactor;
 
    DrawCircle(canvasElem,diametr/ 2,diametr/ 2,radius + 10,'#e9e6f5',0,'none');
    DrawCircle(canvasElem,diametr/ 2,diametr/ 2,radius ,'#fefacd',8,'black');
    DrawCircle(canvasElem,diametr/ 2,diametr/ 2,cRadiusLittleCircle,'#fefacd',8,'black');
  
    let sizeRect = diametr / cSuzeRect;
    //radius -= sizeRect;correct diametr circle rect
    //diametr-= sizeRect; correct center circle point rect
    for (let i = 0; i <= Math.PI * 2; i += 2 * Math.PI / cCountHour) {
        let startY = (diametr- sizeRect) / 2 + (radius - sizeRect) * Math.cos(i);
        let startX = (diametr- sizeRect) / 2 + (radius - sizeRect) * Math.sin(i);     
        DrawRect(canvasElem,startX,startY,sizeRect,sizeRect,'orange');
    }
    let widthLine = diametr / cWidthLine;
    let lengthLine = diametr / cLengthLine;
    let numberLine = 0;
    for (let i = 0; i <= Math.PI * 2; i += 2 * Math.PI /cCountSeconds) {
        if(numberLine % cIndexInt == 0){
            numberLine++;
            continue;
        }
        let startY = diametr / 2 + radius * Math.cos(i);
        let startX = diametr / 2 + radius * Math.sin(i);    
        let endY = diametr / 2 + (radius - lengthLine) * Math.cos(i);
        let endX = diametr / 2 + (radius - lengthLine) * Math.sin(i);     
        DrawLine(canvasElem,startX,startY,endX,endY,widthLine);
        numberLine++;
    }
    DrawInts(diametr,radius);
    setTimeout(DrawHours,0,canvasHour,diametr,radius);
    setTimeout(DrawMinuts,0,canvasMin,diametr,radius);    
    setTimeout(DrawSecLine,0,canvasSec,diametr,radius);   
}
let date = new Date();
let gSecond = cCountLineSeconds - date.getSeconds() * 2 ;
let gMinutes = cCountLineSeconds - date.getMinutes() * 2 + (gSecond / 5) * cStepMinut;
let gHours = cCountLineSeconds - (date.getHours() + date.getMinutes() / 2  * cStepHour) * 10;
function DrawSecLine(canvas,diametr,radius){
    if(gSecond % 10 == 0){
        setTimeout(DrawMinuts,0,canvasMin,diametr,radius);
    }
    canvas.getContext('2d').clearRect(0,0,1000,1000);
    let seconds = gSecond * Math.PI / cCountSeconds;
    let startY = diametr / 2 + (radius - cLengthArrowSecFactor) * Math.cos(seconds);
    let startX = diametr / 2 + (radius - cLengthArrowSecFactor) * Math.sin(seconds);   
    let endY = diametr / 2;
    let endX = diametr / 2;
    DrawLine(canvas,startX,startY,endX,endY,gArrWidthSec,cArrowSecondsColor);
    gSecond -= 2;
    setTimeout(DrawSecLine,1000,canvas,diametr,radius);
}
function DrawMinuts(canvas,diametr,radius){
    if(gMinutes <= -60){
        gMinutes = 60;
    }
    canvas.getContext('2d').clearRect(0,0,1000,1000);
    let minutes = gMinutes * Math.PI / cCountSeconds;
    let startY = diametr / 2 + (radius - cLengthArrowMinutFactor) * Math.cos(minutes);
    let startX = diametr / 2 + (radius - cLengthArrowMinutFactor) * Math.sin(minutes);   
    let endY = diametr / 2;
    let endX = diametr / 2;
    DrawLine(canvas,startX,startY,endX,endY,gArrWidthMin,cArrowMinutesColor);
    gMinutes -= cStepMinut;
    setTimeout(DrawHours,0,canvasHour,diametr,radius);
}
function DrawHours(canvas,diametr,radius){
    canvas.getContext('2d').clearRect(0,0,1000,1000);
    let hours = gHours * Math.PI / cCountSeconds;
    let startY = diametr / 2 + (radius - diametr / cLengthArrowHourFactor) * Math.cos(hours);
    let startX = diametr / 2 + (radius - diametr / cLengthArrowHourFactor) * Math.sin(hours);   
    let endY = diametr / 2;
    let endX = diametr / 2;
    DrawLine(canvas,startX,startY,endX,endY,gArrWidthHour,cArrowHourColor);
    gHours -= cStepHour;
}
const cCorrectCentrInt = 15; 
const cCorrectRadiusInt = 13; 
const cCorrectMargTopInt = 15;
function DrawInts(diametr,radius){
       let number = 3;      
       let sizeInt = diametr / cSizeInt;
       //radius -= sizeRect;correct diametr circle rect
       //diametr-= sizeRect; correct center circle point rect
       for (let i = -0.03; i <= Math.PI * 2; i += 2 * Math.PI / cCountHour) {
        if(number == 13){
            number = 1
        }
        let rad = diametr / cSizeInt ;   
        let correctCenter = diametr / cSizeInt + cCorrectFactorInt
        let int = document.createElement('span');
        int.textContent = number;
        int.style.fontSize = sizeInt + 'px';
        int.style.position = 'absolute';
        int.style.marginLeft = (diametr - correctCenter) / 2 + (radius - rad) * Math.cos(i)  + 'px';    
        int.style.marginTop = (diametr  - correctCenter) / 2  + (radius - rad) * Math.sin(i)  + 'px';            
        document.body.appendChild(int);  
        number++; 
       }
}
function DrawLine(canvas,moveToX,moveToY,endX,endY,width,color = 'none'){
    let obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();
    obCanvas.moveTo(moveToX, moveToY);
    obCanvas.lineTo(endX,endY);
    obCanvas.strokeStyle = color;
    obCanvas.fill();
    obCanvas.lineCap = 'round';
    obCanvas.lineWidth = width;
    obCanvas.stroke();
}
function DrawRect(canvas,posX,posY,width,heidth,color){
    let obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();
    obCanvas.fillStyle = color;
    obCanvas.fillRect(posX,posY,width,heidth);
}
function DrawCircle(canvas,leftM,topM,radius,color,widthBorder,colorBorder){
    let obCanvas = canvas.getContext('2d');
    obCanvas.beginPath();
    obCanvas.arc(leftM,topM,radius,0,2 * Math.PI,false);
    obCanvas.fillStyle = color;
    obCanvas.fill();
    obCanvas.lineWidth
    obCanvas.lineWidth = widthBorder;
    obCanvas.strokeStyle = colorBorder;
    obCanvas.stroke();
}
