let figureS = [
    [0, 1, 1],
    [1, 1, 0]
]
let figureZ = [
    [1, 1, 0],
    [0, 1, 1]
]
let figureT = [
    [1, 1, 1],
    [0, 1, 0],
]
let figureI = [
    [1],
    [1],
    [1],
    [1],
]
let figureJ = [
    [0, 1],
    [0, 1],
    [1, 1],
]
let figureL = [
    [1, 0],
    [1, 0],
    [1, 1],
]
let figureO = [
    [1, 1],
    [1, 1]
]

let posY = 0;
let posX = 0;
let sizeRect = 25;
let widthCanvas = 200;
let heightCanvas = 200;

let heightField = heightCanvas / sizeRect;
let widthField = widthCanvas / sizeRect;

let paddingPlayField = 1;

let playField = new Array(heightField);

for (var i = 0; i < playField.length; i++) {
    playField[i] = new Array(widthField);
}

for(let i = 0; i < heightField; i++){
    for(let j = 0; j < widthField; j++){
        playField[i][j] = 0;
    }
}
let heidthFigure = 4;
let widthFigure = 1;
let startPos = heidthFigure;
let mainFigure = figureI;
let colors = ['red','green','blue'];
let color = 'green';
function PressButton()
{  
    if(event.code == 'KeyS'){          
        ClearFigure(mainFigure,posX * sizeRect + paddingPlayField, (posY) * sizeRect  + paddingPlayField,sizeRect);       
        
        if(startPos > 0){
            startPos--;
        }
        else{
            posY++; 
        }   
        if(posY -1 == heightField - heidthFigure || !CanDriveFigure()){
            posY--;
            PrintFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect + paddingPlayField,sizeRect); 
            posY = 0;
            posX = 0;
            startPos = heidthFigure;
            color = colors[Math.floor(Math.random() * 3)];     
        }          
        PrintFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect + paddingPlayField,sizeRect);                          
    } 
    if(event.code == 'KeyD'){
        ClearFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect  + paddingPlayField,sizeRect);                 
        if(CanDriveFigure(1))
        {
            posX++;              
        }  
        PrintFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect + paddingPlayField,sizeRect);               
    }
    if(event.code == 'KeyA'){
        ClearFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect  + paddingPlayField,sizeRect);              
        if(CanDriveFigure(-1))
        {
            posX--;              
        }   
        PrintFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect + paddingPlayField,sizeRect);    
             
    }
    if(event.code == 'Space'){
        ClearFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect  + paddingPlayField,sizeRect);  
        RotateFigure();
        PrintFigure(mainFigure,posX * sizeRect + paddingPlayField, posY * sizeRect + paddingPlayField,sizeRect);
    }

}
function RotateFigure(){
let heidthNew = widthFigure;
let widthNew = heidthFigure;
let NewFigure = new Array(heidthNew);

for (var i = 0; i < NewFigure.length; i++) {
    NewFigure[i] = new Array(widthNew);
}

for(let i = 0; i < heidthNew; i++){
    for(let j = 0; j < widthNew; j++){
        NewFigure[i][j] = mainFigure[j][widthFigure - i - 1];
    }
}
mainFigure = NewFigure;
widthFigure = widthNew;
heidthFigure = heidthNew;
}

function PrintField(){
    draw(posX * sizeRect + paddingPlayField, posY * sizeRect + paddingPlayField,sizeRect);
}
function draw(posStartX,posStartY,sizeRect) {
    let canvas = document.getElementById('fieldCanvas');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(posStartX,posStartY,sizeRect,sizeRect);  
        ctx.strokeRect(posStartX + 1,posStartY + 1,sizeRect - 2,sizeRect - 2);         
    }
  }


function SetSizeCanvas(){
    let canvas = document.getElementById('fieldCanvas');
    canvas.width = widthCanvas;
    canvas.height = heightCanvas;
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.strokeRect(0,0,widthCanvas,heightCanvas);
    }
}
function PrintFigure(figures,posXDraw,posYDraw,sizeRect){
    let posYNext = posYDraw;
    for(let i = startPos; i < heidthFigure ; i++){
        let posXNext = posXDraw;
        for(let j = 0; j < widthFigure; j++){         
            if(figures[i][j] == 1){
                draw(posXNext, posYNext,sizeRect);                    
                playField[posY + i - startPos][posX + j] = 1;                  
            }  
            posXNext += sizeRect;        
        }
        posYNext += sizeRect;
    }   
}
function CanDriveFigure(wayX = 0){
    for(let i = 0; i < heidthFigure - startPos; i++){ 
        for(let j = 0; j < widthFigure; j++){         
            if(mainFigure[i][j] == 1)
                if(playField[posY + i][posX + j + wayX] == 1){       
                    return false;
                }
            }                   
        }
    return true;
}
function ClearFigure(figures,posXDraw,posYDraw,sizeRect){
    let canvas = document.getElementById('fieldCanvas');
        let ctx = canvas.getContext('2d');
    let posYNext = posYDraw + sizeRect;
    for(let i = startPos; i < heidthFigure; i++){
        let posXNext = posXDraw;
        for(let j = 0; j < widthFigure; j++){         
            if(figures[i][j] == 1){
                ctx.clearRect(posXNext ,posYNext - sizeRect ,sizeRect ,sizeRect );     
                playField[posY + i - startPos][posX + j] = 0;              
            }  
            posXNext += sizeRect;        
        }
        posYNext += sizeRect;
    }   
}


