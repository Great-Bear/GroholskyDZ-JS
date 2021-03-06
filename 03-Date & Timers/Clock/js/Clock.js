let date2 = new Date()
let currentMinuts = date2.getMinutes();
let currentHours = date2.getHours();

let firstNum = new StateBool(false,true);  

function InitClock(){
    SetTime();
    date = new Date();
    setInterval(ChangeTime,1000,'Seconds',date.getSeconds());
}
function ChangeTime(type,time){
let date = new Date();
    if(type == 'Seconds'){
        time = date.getSeconds();
    }
    for(item of Clock.children){
        if(item.className !='points'){                
            if(item.className == type){
                if(firstNum.CurrentState){
                    item.src = `img/${TakeLeftInt(time)}.gif`;              
                }
                else{
                  item.src = `img/${TakeRightInt(time)}.gif`;                         
                }
            }
        }  
    }
    if(currentMinuts != date.getMinutes()){
        currentMinuts = date.getMinutes();  
        ChangeTime('Minuts',currentMinuts);
    }
    if(currentHours != date.getHours()){  
        currentHours = date.getHours();       
        UpdateHours('Hours',currentHours);      
    }
}

function SetTime(){
let date = new Date();
let firstNum = new StateBool(false,true);

    for(item of Clock.children){
        if(item.className !='points'){
            if(item.className == 'Hours'){           
                if(firstNum.CurrentState){
                item.src = `img/${TakeLeftInt(date.getHours())}.gif`;
                }
                else{
                    item.src = `img/${TakeRightInt(date.getHours())}.gif`;                
                }
            }
            else if(item.className == 'Minuts'){
                if(firstNum.CurrentState){
                    item.src = `img/${TakeLeftInt(date.getMinutes())}.gif`;
                }
                else{
                    item.src = `img/${TakeRightInt(date.getMinutes())}.gif`;                
                }
            }
            else if(item.className == 'Seconds'){
                if(firstNum.CurrentState){
                    item.src = `img/${TakeLeftInt(date.getSeconds())}.gif`;
                }
                else{
                   item.src = `img/${TakeRightInt(date.getSeconds())}.gif`;       
                }
            }
        }
    }
}

function TakeRightInt(number){
    let fractional = number / 10;
    let leftint = Math.floor(number / 10);
    let rightNumber  = ((fractional - leftint) * 10).toFixed(2);
    if(rightNumber < 0) rightNumber = !rightNumber;
    return rightNumber = Math.floor(rightNumber);      
}
function TakeLeftInt(number){
    return Math.trunc (number / 10);
}