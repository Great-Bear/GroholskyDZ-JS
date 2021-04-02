let tetris ;
function loadGame(){
    let figures = new Figures(); 
  tetris = new Tetris(figures);
}


function PressButton(){
    
if(event.code == 'KeyQ'){
    let a = 0;
}
    if(event.code == 'KeyS'){          
        if(tetris.posDrawY != -1){
            tetris.ClearFigure(); 
        } 
         tetris.posDrawY++;  
        if(tetris.posDrawY -1 == tetris.heightPlayField - tetris.currectFigure.height || !tetris.CanDriveFigure()){
            tetris.posDrawY--;
            tetris.PrintFigure(); 
            tetris.TakeNewFigure(); 
            return;
        }          
        tetris.PrintFigure();                          
    } 
    if(event.code == 'KeyD'){
        tetris.ClearFigure();                 
        if(tetris.CanDriveFigure(1))
        {
        tetris.posDrawX++;              
        }  
        tetris.PrintFigure();               
    }
    if(event.code == 'KeyA'){
        tetris.ClearFigure(); 
        if(tetris.CanDriveFigure(-1))
        {
            tetris.posDrawX--;              
        }   
        tetris.PrintFigure();                   
    }
    if(event.code == 'Space'){
        if(tetris.heightPlayField < tetris.posDrawY + tetris.currectFigure.width){ return}
        tetris.ClearFigure();  
        tetris.RotateFigure();
        tetris.PrintFigure();
    }
}