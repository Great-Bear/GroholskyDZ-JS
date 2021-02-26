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

            if(currentHightIndex != DEFAULT_INDEX && oldHightIndex != DEFAULT_INDEX){

                if(oldHightIndex < currentHightIndex)
                    direction = DIRECTION_UP;
                else
                    direction = DIRECTION_DOWN;

                break;  
            }      

            if(event.target == event.target.parentNode.children[i])
                currentHightIndex = i;
            
            if(currentHighlightElem.elem == event.target.parentNode.children[i])
                oldHightIndex = i;
                         
        }

     let item;
 

        if(direction)
            item = currentHighlightElem.elem.nextElementSibling;
        else
            item = currentHighlightElem.elem.previousElementSibling;

        while(true){
       
            item.style.backgroundColor = HIGHLIGHT_COLOR;

            if(item == event.target)
                return;

            if(direction)
                item = item.nextElementSibling;
            else
                item = item.previousElementSibling;
        }
    }


    if(event.ctrlKey){
 
        targetStyle.backgroundColor == HIGHLIGHT_COLOR?
         targetStyle.backgroundColor = NOT_DEFAULT_COLOR :
         targetStyle.backgroundColor = HIGHLIGHT_COLOR;

            return;
    }

    for(item of document.getElementById('listBooks').childNodes)
        if(item.nodeName == 'LI')
            item.style.backgroundColor = NOT_DEFAULT_COLOR;
   
    currentHighlightElem.style =  targetStyle;
    currentHighlightElem.elem = event.target;

    targetStyle.backgroundColor = HIGHLIGHT_COLOR;
}









/*if(event.shiftKey){

    let a = event.target.parentNode.children;

    for(b of a){
        if(b == event.target)
        alert(b.innerText);
    }

      let item = currentHighlightElem.elem.nextElementSibling;

  while(true){
     
          item.style.backgroundColor = 'orange';

          if(item == event.target)
          return;

          item = item.nextElementSibling;

      }
  }*/