




function CreateNewList(){

    let ul = document.createElement('ul');

    ul.innerHTML =
     '<li><span>New list</span>'+
        '<ul>'+
            '<li><span>item1</span></li>'+
            '<li><span>item1</span></li>'+
        '</ul>'+
    '</il>';

  
    document.body.append(ul);








    
  ul.addEventListener('click',CallOperation);

}

function DefineOperation(){
    let numberOper = 0;
    
    for (const tag of document.getElementsByName('group')) {
        if(tag.checked) break;               
            numberOper++;
    }
    return numberOper;
}

const CHANGE_TEXT = 2, DELETE_ELEMENT = 4, ADD_ELEMENT_END = 0;

function CallOperation(event){
    let numberOperation = DefineOperation();

    switch(numberOperation){
        case  ADD_ELEMENT_END : 
       // event.target.parentNode.innerHTML = event.target.parentNode.innerHTML + `<li>${addElemEnd.value}</li>`;

  let lastitem = document.createElement('li');
    lastitem.innerHTML = `<li>${addElemEnd.value}`;
        event.target.parentNode.parentNode.append(lastitem);
                break;

        case  CHANGE_TEXT : '?'
            event.target.textContent = changeElem.value;
                break;

        case  DELETE_ELEMENT :           
        if(event.target.parentNode.parentNode.children.length == 1)
            event.target.parentNode.parentNode.remove();
       
            event.target.parentNode.remove();

            
                break;
    }

}

/*
    let ul = document.createElement('ul');
let il = document.createElement('il');
 il.textContent ='fdsfasd';
 let span = document.createElement('span');
 span.textContent = 'New list';



let ul2 = document.createElement('ul');
let il2 = document.createElement('il');
il2.textContent ='fdsfasd';
let span2 = document.createElement('span');
span2.textContent = 'New item';
   ul.appendChild(il);  
    il.appendChild(ul2);

    ul2.appendChild(il2);
*/


  //   ul.addEventListener('click',e =>  e.target.textContent = changeElem.value)


  // ul.addEventListener('click', e =>  e.target.parentNode.parentNode.remove());