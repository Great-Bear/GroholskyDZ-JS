
let isDIV = true;
const EDIT_TXT = 'KeyE', SAVE_TXT = 'KeyS';


function ChanhgeContainer(){

if(event.code == EDIT_TXT &&  event.ctrlKey)
{
   if(isDIV){
    TextConteiner.outerHTML = `<textarea id="TextConteiner">${TextConteiner.outerText}</textarea>`;
        isDIV = !isDIV;
   }
   event.preventDefault();
}

if (event.code == SAVE_TXT &&  event.ctrlKey)
{
    if(!isDIV){
    TextConteiner.outerHTML  = `<div id="TextConteiner" onkeypress=" return false">${TextConteiner.value}</div>`;
        isDIV = !isDIV;
    }
    event.preventDefault();
}
}


function SortCol()
{
   let numberSortCol = ChoiceSortCol(event.target);
   let arrDataCol = ChoiceDataCol(numberSortCol);
   SorfArr(arrDataCol);
   ChangeTableData(arrDataCol,numberSortCol);

}

function ChoiceDataCol(idCol){

    let dataCol = new Array();

    for(item of SortedTable.firstElementChild.children){

        if(item.nodeName == 'TR'){
            let index = 0;

            if(item.id == 'nameCol') continue;

                for(itemTR of item.children){

                    if(index == idCol) {
                        dataCol.push(itemTR.textContent);
                        break;
                    }               
                    index++;
                }
        }
    }
    return dataCol;
}

function SorfArr(dataCol){
 //   dataCol.sort((a,b) => {return b - a});
    dataCol.sort();
    return dataCol;
}

function ChoiceSortCol(choice){

    let index = 0;

    for(item of choice.parentNode.children)
    {
        if(choice.textContent == item.textContent) return index;
            index++;
    }
}

let TmpFirstName,TmpLastName,TmpAge,TmpCompane;

function ChangeTableData(dataCol,idCol){

    let indexArr = 0;

    for(item of SortedTable.firstElementChild.children){
    
        if(item.nodeName == 'TR'){
            let index = 0;
          
            if(item.id == 'nameCol') continue;
    
                for(itemTR of item.children){
                    
                    if(itemTr.textContent != dataCol[index])

                      itemTR.textContent = dataCol[indexArr];
                      indexArr++;
                      index++;
                      continue;             
            }
            index++;
        }
    }
}