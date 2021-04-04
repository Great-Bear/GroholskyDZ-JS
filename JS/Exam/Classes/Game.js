class Tetris
{
    posDrawX = 3;
    posDrawY = -1;
    sizeRect = 25;
    widthCanvas = 200;
    heightCanvas = 400; 
    paddingPlayField = 1;
    heightPlayField;
    widthPlayField;
    playField;
    playFielsColors;
    figures;  
    currectFigure = new Figure();
    currectColor;
    nextFigure = new Figure();
    nextColor;
    colors = ['red','green','blue'];
    canvas;
    countScore = 0;
    topScore = 0;
  
    constructor(figures){
       if(document.cookie.length){
            this.topScore = document.cookie.substring(document.cookie.lastIndexOf('=') + 1,document.cookie.length)
            TopScore.textContent = `Top:${this.topScore}`
       }
       this.figures = figures;
       this.currectFigure = this.figures.figuresPool[Math.floor(Math.random() * this.figures.figuresPool.length)];
       this.currectColor = this.colors[Math.floor(Math.random() * this.colors.length)]
       this.nextFigure = this.figures.figuresPool[Math.floor(Math.random() * this.figures.figuresPool.length)];
       this.nextColor = this.colors[Math.floor(Math.random() * this.colors.length)];
       this.heightPlayField = this.heightCanvas / this.sizeRect;
       this.widthPlayField = this.widthCanvas / this.sizeRect;

       this.playField = new Array(this.heightPlayField);
       this.playFielsColors = new Array(this.heightPlayField);

        for (let i = 0; i < this.playField.length; i++) {
            this.playField[i] = new Array(this.widthPlayField);
            this.playFielsColors[i] = new Array(this.widthPlayField);   
                for(let j = 0; j < this.widthPlayField; j++){
                    this.playField[i][j] = 0;
                    this.playFielsColors[i][j] = 'white';
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
                    this.playFielsColors[this.posDrawY + i][this.posDrawX + j] = this.currectColor;                  
                }  
                posXNext += sizeRect;        
            }
            posYNext += sizeRect;
        }        
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
                    this.playFielsColors[this.posDrawY + i][this.posDrawX + j] = 'white';            
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
    DrawRect(posStartX,posStartY,sizeRect,color = this.currectColor) {
        let canvas = document.getElementById('fieldCanvas');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = color;
            ctx.fillRect(posStartX,posStartY,sizeRect,sizeRect);  
            ctx.strokeRect(posStartX + 1,posStartY + 1,sizeRect - 2,sizeRect - 2);       
        }
    }
    CanDriveFigure(wayX = 0){
        for(let i = 0; i < this.currectFigure.height; i++){ 
            for(let j = 0; j < this.currectFigure.width; j++){         
                if(this.currectFigure.structure[i][j] == 1)
                    if(this.playField[this.posDrawY + i][this.posDrawX + j + wayX] == 1 ||
                        this.posDrawX + wayX < 0 ||
                        this.posDrawX + wayX + this.currectFigure.width> this.widthPlayField){       
                        return false;
                    }
                }                   
            }
        return true;
    }
    TakeNewFigure(){
        this.CheckLine(); 
        this.posDrawX = 3;
        this.posDrawY = -1;
        this.currectColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currectFigure = this.nextFigure;
        this.currectColor = this.nextColor;
        this.nextFigure = this.figures.figuresPool[Math.floor(Math.random() * this.figures.figuresPool.length)]; 
        this.nextColor = this.colors[Math.floor(Math.random() * this.colors.length)];
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
        if(this.CanRotate(NewFigure,heightNew,widthNew)){
            this.currectFigure = new Figure(widthNew,heightNew,NewFigure);
        }      
    }
    CanRotate(NewFigure,heightNew,widthNew){
        for(let i = 0; i < heightNew; i++){
            for(let j = 0; j < widthNew; j++){
                if(NewFigure[i][j] == 1 && this.playField[this.posDrawY + i][this.posDrawX + j] == 1 ||
                    this.posDrawX + this.currectFigure.height > this.widthPlayField){
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
        ctx.clearRect(this.paddingPlayField,(indexEmptyLine * this.sizeRect) + this.paddingPlayField,this.widthCanvas,this.sizeRect);  
       for(; indexEmptyLine > 0; indexEmptyLine--){
            for(let i = 0; i < this.widthPlayField; i++){
                if(this.playField[indexEmptyLine - 1][i] == 1){
                    let color = this.playFielsColors[indexEmptyLine - 1][i];

                    this.DrawRect(i * this.sizeRect + this.paddingPlayField,indexEmptyLine * this.sizeRect + this.paddingPlayField,this.sizeRect,color);   
                    this.playField[indexEmptyLine ][i] = 1;

                    ctx.clearRect(i * this.sizeRect + this.paddingPlayField,(indexEmptyLine - 1) * this.sizeRect + this.paddingPlayField,this.sizeRect ,this.sizeRect); 
                    this.playField[indexEmptyLine - 1][i] = 0;    
                }
            }
        }
        Score.textContent = `Score:${this.countScore += 10}`;  
        if(this.countScore > this.topScore)
            document.cookie = `TopScore=${this.countScore}`;
    }
    RestartGame(){
        this.posDrawX = 3;
        this.posDrawY = -1;
        let canvas = document.getElementById('fieldCanvas');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(1,1,tetris.widthCanvas - 1,tetris.heightCanvas);
        tetris.countScore = 0;
        for(let i = 0; i < this.heightPlayField; i++){
            for(let j = 0; j < this.widthPlayField; j++){
            this.playField[i][j] = 0;
            }
        }
    }
}



