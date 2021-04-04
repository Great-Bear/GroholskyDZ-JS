class NextFigure{
    canvas;
    ctx;
    currentFigure;
    currecrColor;
    constructor(figure,color){
        this.canvas = document.getElementById('nextFigure');
        this.canvas.width = 100;
        this.canvas.height = 100 ;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeRect(0,0,100,100);
        this.currentFigure = figure;
        this.currecrColor = color;
        this.DrawFigures();       
    }
    DrawFigures(){       
        let extraWidth = 0;
        let extraHeight = 0;
        if(this.currentFigure.width == this.currentFigure.height){
            extraWidth = 10;
            extraHeight = 10;
        }
        let posY = this.currentFigure.width * 10 + extraHeight;   
        let sizeRect = 20;
        this.ctx.fillStyle = this.currecrColor;
        for(let i = 0; i < this.currentFigure.height; i++){
            let posX = this.currentFigure.height * 10 + extraWidth;
            for(let j = 0; j < this.currentFigure.width; j++){
                if(this.currentFigure.structure[i][j] == 1){
                    this.ctx.fillRect(posX,posY,sizeRect,sizeRect);  
                    this.ctx.strokeRect(posX + 1, posY + 1,sizeRect - 2,sizeRect - 2);  
                } 
                posX += sizeRect; 
            }
            posY += sizeRect;
        }
    }
    ClearCanvas(){
        this.ctx.clearRect(1,1,this.canvas.width - 2,this.canvas.height - 2);
    }
}