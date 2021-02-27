
function CheckCorrectInputName(){

let name = event.target.value;
let notHaveDigit = /[0-9]/;

  if(notHaveDigit.test(name[name.length - 1])){
    event.target.value = name.substring(0, name.length - 1);
  }
}

let currectOpenItem;

function listInfoStart(){
  
    for(item of blockInfo.children)   
        if(item.nodeName == 'LI')
        {        
            for(itemLI of item.children)   
                if(itemLI.nodeName == 'DIV')
                {   
                    itemLI.hidden = true;               
                }
        } 
        currectOpenItem = blockInfo.firstElementChild.children[1];
            currectOpenItem.hidden = false;
}




function rearctClick(elem, searhNode = 'DIV') {

    for(item of elem.children)   
        if(item.nodeName == searhNode)
        {   
           if(item == currectOpenItem){
                currectOpenItem.hidden = !currectOpenItem.hidden;
                return;
           }
            
            currectOpenItem.hidden = true;
            currectOpenItem = item;  
            currectOpenItem.hidden = false;
            return;
        } 

    
        event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    
}