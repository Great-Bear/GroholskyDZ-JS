function rearctClick(elem) {

    for(item of elem.parentNode.childNodes)   
        if(item.nodeName == 'UL') 
             item.hidden = !item.hidden;   

    
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    
}

function hoverMouse(){
    event.target.style.fontWidth = 'bolder';

}

function outMouse(){
    event.target.style.fontWidth = 'normal';
}