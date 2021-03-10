function Reset(container){
    for(item of container.children){
        if(item.nodeName == 'DIV'){
            Reset(item);
        }
        if(item.nodeName == 'INPUT'){
            if(item.type == 'text'){
                item.value = '';
            }
            else{
                item.checked = false;
            }
        }
        if(item.nodeName == 'SELECT'){
            item.selectedIndex = 0;
        }
    }
}
function CheckForm(container){
    for(item of container.children){
        if(item.nodeName == 'DIV'){
            CheckForm(item);
        }
        if(item.nodeName == 'INPUT'){
            if(item.type == 'text'){
                if(item.value.length == 0){
                    item.style.backgroundColor = 'red';
                }              
            }
            else{
                item.style.backgroundColor = 'red';
            }
            
        }
    }
}