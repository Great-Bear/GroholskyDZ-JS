
function CreateNewList(){

    let ul = document.createElement('ul');

    ul.innerHTML =
     '<li><span>New list</span>'+
        '<ul>'+
            '<li><span>item1</span></li>'+
        '</ul>'+
    '</il>';

  
    document.body.append(ul);
  
  ul.addEventListener('click',CallOperation);

}

function DefineOperation(){
    let numberOper = 0;
    let a=0;
    
    for (const tag of document.getElementsByName('group')) {

        if(tag.checked) {
            for (const textFile of document.getElementsByName('textField')) {
                if(a == numberOper)
                {
                    if(textFile.value.length == 0)
                    {
                        alert('line is empty');
                        return -1;
                    }
                    else{
                        return numberOper;
                    }
                }
                a++;
            }
            return numberOper;
        }               
            numberOper++;
    }

    return numberOper;
}

const CHANGE_TEXT = 2, DELETE_ELEMENT = 4, ADD_ELEMENT_END = 0, INSERT = 1, INSER_NEW_LIST = 3;

function CallOperation(event){
    let numberOperation = DefineOperation();
 

    
  if(numberOperation == -1)
    return;
    

    switch(numberOperation){
        case  ADD_ELEMENT_END : 

  let lastitem = document.createElement('li');
    lastitem.innerHTML = `<li>${addElemEnd.value}`;
        event.target.parentNode.parentNode.append(lastitem);
                break;

        case  CHANGE_TEXT : 
            event.target.textContent = changeElem.value;
                break;

        case  DELETE_ELEMENT : 
                  
        if(event.target.parentNode.parentNode.children.length == 1)
            event.target.parentNode.parentNode.remove();
        else
            event.target.parentNode.remove();           
                break;

        case  INSERT : 
        let il = document.createElement('il');
        il.innerHTML = `<li><span>${insertText.value}</span></li>`;

            event.target.parentNode.before(il);
        break;

        case  INSER_NEW_LIST : 

        for (const tag of event.target.parentNode.childNodes) {
            if(tag.tagName == 'UL'){

            
            alert('list have list');
            return;
            }
            
        }
       


        let newList = event.target.parentNode.innerHTML;
        newList += '<ul>'+
        `<li><span>${NewNestedName.value}</span></li>`+
            '</ul>'+
        '</il>';

        event.target.parentNode.innerHTML = newList;
        break;
                
    }

}