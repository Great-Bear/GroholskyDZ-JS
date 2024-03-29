let tetris;
let nextFigure;
let speed = 600;
let changeTime = false;
let timer;
function loadGame(){
  let figures = new Figures(); 
  tetris = new Tetris(figures);
  nextFigure = new NextFigure(tetris.nextFigure,tetris.nextColor);

  RulesButton.addEventListener('click',()=>{
        alert('A - move left\nD - move right\nnSpace - increase fall rate \S - rotate figure')
    });
  PlayButton.addEventListener('click',()=> {
        timer = setTimeout(StepFigure,speed);
        untiFocusButton.focus();
        messageBlock.hidden = true;
        PlayButton.hidden = true;
        PauseButton.hidden = false;
        ModeGame.hidden = true;
    });
    PauseButton.addEventListener('click',() => {
        messageBlock.hidden = false;
        message.textContent = 'Pause';
        clearTimeout(timer);
        PlayButton.hidden = false;
        PauseButton.hidden = true;
    });
    RestartButton.addEventListener('click',() => {
        messageBlock.hidden = true;      
        PauseButton.hidden = false;
        RestartButton.hidden = true;
        ModeGame.hidden = true;
        tetris.RestartGame();
        untiFocusButton.focus();
        timer = setTimeout(StepFigure,speed);
    });   
    ModeGame.addEventListener('click',() => {
        if(IsHardMode.checked == true){
            nextFigure.ClearCanvas();
            tetris.reward = 20;          
            untiFocusButton.focus();
            ModeText.textContent = 'Mode: hard';
        }
        else{
            nextFigure.DrawFigures();
            tetris.reward = 10;          
            untiFocusButton.focus();
            ModeText.textContent = 'Mode: easy';
        }
        
    })   
}
function StepFigure(){
    if(tetris.posDrawY != -1){
        tetris.ClearFigure(); 
    }   
     tetris.posDrawY++;  
     if(tetris.posDrawY == 0 && !tetris.CanDriveFigure()){
        messageBlock.hidden = false;
        message.textContent = 'You lost press restart to replay';
        clearTimeout(timer);
        RestartButton.hidden = false;
        ModeGame.hidden = false;
        PauseButton.hidden = true;
        return;
    }
    if(tetris.posDrawY -1 == tetris.heightPlayField - tetris.currectFigure.height || !tetris.CanDriveFigure()){
        tetris.posDrawY--;
        if(tetris.posDrawY != -1){
            tetris.PrintFigure(); 
        }
        nextFigure.ClearCanvas();    
        tetris.TakeNewFigure();
        nextFigure.currentFigure = tetris.nextFigure;
        nextFigure.currecrColor = tetris.nextColor; 
        if(IsHardMode.checked == false)
            nextFigure.DrawFigures();
        speed = 600;
    } 
    else{
        tetris.PrintFigure();  
    }
    timer = setTimeout(StepFigure,speed)      
}


function PressButton(){
    if(PauseButton.hidden != true)
    {
        if(event.code == 'Space'){
                speed = 100;      
        }
        else if(event.code == 'KeyD'){
            if(tetris.posDrawY != -1)
                tetris.ClearFigure();                 
                    if(tetris.CanDriveFigure(1))
                    {
                        tetris.posDrawX++;              
                    }  
                    tetris.PrintFigure();               
        }
        else if(event.code == 'KeyA'){
            if(tetris.posDrawY != -1)
                tetris.ClearFigure(); 
                    if(tetris.CanDriveFigure(-1))
                    {
                        tetris.posDrawX--;              
                    }   
                    tetris.PrintFigure();                   
        }
        else if(event.code == 'KeyS'){
                if(tetris.posDrawY != -1){
                
                if(tetris.heightPlayField < tetris.posDrawY + tetris.currectFigure.width){ return}
                tetris.ClearFigure();  
                tetris.RotateFigure();
                tetris.PrintFigure();
            } 
        }
    }
}