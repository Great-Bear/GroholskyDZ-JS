class Tetris
{
    posDrawX = 0;
    posDrawY = -1;
    sizeRect = 25;
    widthCanvas = 200;
    heightCanvas = 200; 
    paddingPlayField = 1;
    heightPlayField;
    widthPlayField;
    playField;
    figures;  
    currectFigure = new Figure();
    colors = ['red','green','blue'];
    currectColor = 'green';
    canvas;
  
    constructor(figures){
        this.figures = figures;
       // this.currectFigure = this.figures.figuresPool[Math.floor(Math.random() * this.figures.figuresPool.length)];
       this.currectFigure = this.figures.figuresPool[6];
       this.heightPlayField = this.heightCanvas / this.sizeRect;
        this.widthPlayField = this.widthCanvas / this.sizeRect;
        this.playField = new Array(this.heightPlayField);

        for (let i = 0; i < this.playField.length; i++) {
            this.playField[i] = new Array(this.widthPlayField);
                for(let j = 0; j < this.widthPlayField; j++){
                    this.playField[i][j] = 0;
                }
        }
       
        this.canvas = document.getElementById('fieldCanvas');
        this.InitializeCanvas();
    }
    PrintFigure(){
        let posYNext = this.posDrawY * this.sizeRect + this.paddingPlayField;
        let sizeRect = this.sizeRect;
        for(let i = 0; i < this.currectFigure.height ; i++){
            let posXNext = this.posDrawX * this.sizeRect + this.paddingPlayField;
            for(let j = 0; j < this.currectFigure.width; j++){         
                if(this.currectFigure.structure[i][j] == 1){
                    this.DrawRect(posXNext, posYNext,sizeRect);                    
                    this.playField[this.posDrawY + i][this.posDrawX + j] = 1;                  
                }  
                posXNext += sizeRect;        
            }
            posYNext += sizeRect;
        }  
        this.CheckLine(); 
    }
    ClearFigure(){
        let canvas = document.getElementById('fieldCanvas');
        let ctx = canvas.getContext('2d');
        let posYNext = this.posDrawY * this.sizeRect + this.paddingPlayField;

        for(let i = 0; i < this.currectFigure.height; i++){
            let posXNext = this.posDrawX * this.sizeRect + this.paddingPlayField;
            for(let j = 0; j < this.currectFigure.width; j++){         
                if(this.currectFigure.structure[i][j] == 1){  
                    ctx.clearRect(posXNext ,posYNext,this.sizeRect ,this.sizeRect );     
                    this.playField[this.posDrawY + i][this.posDrawX + j] = 0;              
                }  
                posXNext += this.sizeRect;        
            }
            posYNext += this.sizeRect;
        }   
    }
    InitializeCanvas(){
        let extraHeight = 2; // so that the shapes do not erase the bottom border
        let extraWidth = 2; // and width
        this.canvas.width = this.widthCanvas + extraWidth;
        this.canvas.height = this.heightCanvas + extraHeight;
        if (this.canvas.getContext) {
            let ctx = this.canvas.getContext('2d');
            ctx.strokeRect(0,0,this.widthCanvas + extraWidth,this.heightCanvas + extraHeight);
        }
    }
    DrawRect(posStartX,posStartY,sizeRect) {
        let canvas = document.getElementById('fieldCanvas');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = this.currectColor;
            ctx.fillRect(posStartX,posStartY,sizeRect,sizeRect);  
            ctx.strokeRect(posStartX + 1,posStartY + 1,sizeRect - 2,sizeRect - 2);       
        }
    }
    CanDriveFigure(wayX = 0){
        for(let i = 0; i < this.currectFigure.height; i++){ 
            for(let j = 0; j < this.currectFigure.width; j++){         
                if(this.currectFigure.structure[i][j] == 1)
                    if(this.playField[this.posDrawY + i][this.posDrawX + j + wayX] == 1){       
                        return false;
                    }
                }                   
            }
        return true;
    }
    TakeNewFigure(){
        this.posDrawX = 0;
        this.posDrawY = -1;
        this.currectColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currectFigure = this.figures.figuresPool[6];
       
        //this.currectFigure = this.figures.figuresPool[Math.floor(Math.random() * this.figures.figuresPool.length)];
    }
    RotateFigure(){
        let heightNew = this.currectFigure.width;
        let widthNew = this.currectFigure.height;
        let NewFigure = new Array(heightNew);
        
        for (let i = 0; i < NewFigure.length; i++) {
            NewFigure[i] = new Array(widthNew);
                for(let j = 0; j < widthNew; j++){
                    NewFigure[i][j] = this.currectFigure.structure[j][this.currectFigure.width - i - 1];
                }
        }
        if(!this.CanRotate(NewFigure,heightNew,widthNew)){
            return
        }

        this.currectFigure.structure = NewFigure;
        this.currectFigure.width = widthNew;
        this.currectFigure.height = heightNew;
    }
    CanRotate(NewFigure,heightNew,widthNew){
        for(let i = 0; i < heightNew; i++){
            for(let j = 0; j < widthNew; j++){
                if(NewFigure[i][j] == 1 && this.playField[this.posDrawY + i][this.posDrawX + j] == 1){
                    return false;
                }
            }
        }
        return true;
    }
    CheckLine(){     
        for(let y = 0; y < this.heightPlayField; y++){
            let countFullRectLine = 0;
            for(let x = 0; x < this.widthPlayField; x++){
                if(this.playField[y][x] == 1){
                    countFullRectLine++;
                }
            }
            if(countFullRectLine == this.widthPlayField){
                this.PressPlayFiels(y);
            }
        }
    }
    PressPlayFiels(indexEmptyLine){
        for(let i = 0; i < this.widthPlayField; i++){
            this.playField[indexEmptyLine][i] = 0;
        }

        let canvas = document.getElementById('fieldCanvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(indexEmptyLine * this.sizeRect,0,this.widthPlayField,this.sizeRect);
        ctx.fillRect(0,indexEmptyLine * this.sizeRect,this.widthCanvas,this.heightCanvas); 
        for(let y = indexEmptyLine; y >= 0; y--){
            for(let x = 0; x < this.widthPlayField; x++){
                if(this.playField[y][x] == 1){
                    countFullRectLine++;
                }
            }
        }
    }
}



