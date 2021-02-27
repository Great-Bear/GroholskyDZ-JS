function rearctClick(elem) {

    for(item of elem.parentNode.childNodes)   
        if(item.nodeName == 'UL') 
             item.hidden = !item.hidden;   

    
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    
}

function hoverMouse(){
    event.target.style.fontWeight  = "bolder";

}

function outMouse(){
    event.target.style.fontWeight  = 'normal';
}

let currentHighlightElem = {
    style : 'white',
    elem : undefined
};

const DIRECTION_UP = 1,DIRECTION_DOWN = 0;
const HIGHLIGHT_COLOR = 'orange',NOT_DEFAULT_COLOR ='white';
const DEFAULT_INDEX = -1;

let direction ; 


function HighlightLine(){
   
    let targetStyle = event.target.style;

    if(event.shiftKey){

        let currentHightIndex = DEFAULT_INDEX, oldHightIndex = DEFAULT_INDEX;

        for(let i = 0; i < event.target.parentNode.children.length; i++){

            if(event.target == event.target.parentNode.children[i])
                currentHightIndex = i;
            
            if(currentHighlightElem.elem == event.target.parentNode.children[i])
                oldHightIndex = i;
                              
                if(currentHightIndex != DEFAULT_INDEX && oldHightIndex != DEFAULT_INDEX){
                    oldHightIndex < currentHightIndex ? direction = DIRECTION_DOWN : direction = DIRECTION_UP; 
                        break;  
                }      
        }

     let item;

        if(direction)    
            item = currentHighlightElem.elem.previousElementSibling;
        else
            item = currentHighlightElem.elem.nextElementSibling;

        while(true){
       
            item.style.backgroundColor = HIGHLIGHT_COLOR;

            if(item == event.target)
                return;

            if(direction)                
                item = item.previousElementSibling;
            else
                item = item.nextElementSibling;
        }
    }


    if(event.ctrlKey){
 
        targetStyle.backgroundColor == HIGHLIGHT_COLOR?
        targetStyle.backgroundColor = NOT_DEFAULT_COLOR :
        targetStyle.backgroundColor = HIGHLIGHT_COLOR;
            return;
    }
    let listBooksChildren = document.getElementById('listBooks').children;
    for(item of listBooksChildren )
            item.style.backgroundColor = NOT_DEFAULT_COLOR;
   
    currentHighlightElem.style =  targetStyle;
    currentHighlightElem.elem = event.target;

    targetStyle.backgroundColor = HIGHLIGHT_COLOR;
}


const MIN_WIDTH = 150, MIN_HEIGHT = 100;
let startPosX,startPosY;
let canChanPos = false;


function StartMove(){
    startPosX = event.pageX;
    startPosY = event.pageY;
    canChanPos = true;
}

function EndMove()
{
    canChanPos = false;
}

function ChangeSizeBlock(){


    if(canChanPos){
           

      let newWidth = (event.pageX - startPosX);
      let newHeight = (event.pageY - startPosY);
         
        if((mainBlock.clientWidth + newWidth) <= MIN_WIDTH ||
           (mainBlock.clientHeight + newHeight) <= MIN_HEIGHT) return;

       mainBlock.style.width = (mainBlock.clientWidth + newWidth) + 'px';
       mainBlock.style.height = (mainBlock.clientHeight + newHeight) + 'px';

       triangle.style.left = mainBlock.clientWidth - 25 + 'px';   
       triangle.style.top = mainBlock.clientHeight - 25 + 'px';   

       backGround.style.width = (backGround.clientWidth + newWidth) + 'px';
       backGround.style.height = (backGround.clientHeight + newHeight) + 'px';

       startPosX = event.pageX;
       startPosY = event.pageY;
    }
   

}



