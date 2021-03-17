
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

let numberSortCol
function TypeSort()
{
   numberSortCol = ChoiceSortCol(event.target);
   let arrDataCol = ChoiceDataTable();
   SorfArr(arrDataCol,numberSortCol);
   ChangeTableData(arrDataCol,numberSortCol);

}

let dataTR = {
}


function ChoiceDataTable(){
  
    let dataTable = new Array();

    for(item of SortedTable.firstElementChild.children){

    if(item.id == 'nameCol') continue;

        if(item.nodeName == 'TR'){

            let index = 0;
                let dataRow = Array();

                    for(itemTR of item.children){              
                        dataRow.push(itemTR.textContent);                           
                        index++;
                    }
                dataTable.push(dataRow);
        }
    }
    return dataTable;
}

function CompareString(a,b){

    var nameA = a[numberSortCol].toLowerCase(), nameB = b[numberSortCol].toLowerCase()

    if (nameA < nameB) 
    return -1
    if (nameA > nameB)
    return 1
        return 0 
    };

function CompareDigits(a,b){
    return a[numberSortCol] - b[numberSortCol];
}

const SORT_DIGITS = 2;

function SorfArr(dataCol,numberSortCol){

if(numberSortCol == SORT_DIGITS)
    dataCol.sort(CompareDigits)
    
else
    dataCol.sort(CompareString);

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

let indexRow = 0;
    for(item of SortedTable.firstElementChild.children){
    
    if(item.id == 'nameCol') continue;
        if(item.nodeName == 'TR'){
                  
            let indexCol = 0;
                for(itemTR of item.children){      
                        itemTR.textContent = dataCol[indexRow][indexCol];
                        indexCol++;
                }
        }
        indexRow++;
    }
}