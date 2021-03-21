let posY;
let timer;
let change = false;
let gevent;
$(document).ready(function() {
    $('#controlPoint').mousedown(function(event){
        posY = event.pageY;    
        change = !change;  
        gevent = event;
        str = elemid.clientHeight
        str2 = elemid2.clientHeight
    })    
    $(document.body).mouseup(function(event){
        //change = !change
    })  
    $(document.body).mousemove(function(event){
        if(change)
        ChangePos(event);
    })  
    $('#controlPoint').mousemove(function(event){
       // if(change)
       // ChangePos(event);
      })      
});
let str = 0;
let str2 = 0 ;
let step = 0.01;
let maxHeid= 300;
function ChangePos(event){
   if(posY < event.pageY){
       if(elemid2.clientHeight <= 5 ){
           return;
       }
    str += event.pageY - posY;
    str2 -= event.pageY - posY;
    elemid.style.height = str + 'px';
    elemid2.style.height = str2 + 'px';
   }
   else{  
    str -= posY - event.pageY ;
    elemid.style.height = str + 'px';
    str2 += posY - event.pageY ;
    elemid2.style.height = str2 + 'px';
   }
   posY = event.pageY;

}
