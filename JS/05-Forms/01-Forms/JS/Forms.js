let arrRice = new PoolRice();
let arrTickets = new Array();
function InitPoolRice(){
    arrRice.ArrRice.push(new Rice('Lviv-Kiev',new Date(2012, 0, 1, 0, 0, 0, 0)));
    arrRice.ArrRice.push(new Rice('Kiev-Lviv',new Date(2011, 0, 1, 0, 0, 0, 0)));
}
function CreateTable(){
    let countPlace;
    let arrPlace; 
    for(item = 0; item < arrRice.ArrRice.length; item++){
        if(SelectDirection.value == arrRice.ArrRice[item].Direction){
            countPlace = arrRice.ArrRice[item].places;
            arrPlace = arrRice.ArrRice[item].places;
        }
    }
    if(document.getElementById('ticketsNum') != undefined){  
        while (ticketsNum.firstChild) {
            ticketsNum.removeChild(ticketsNum.firstChild);
        }
        mainBlock.removeChild(ticketsNum);
    }
    table = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    table.id = 'ticketsNum';
    table.onclick = ShowPrice;
    if(countPlace.length > 2){
        let Tr = document.createElement('tr');
        table.firstChild.appendChild(Tr);
        let Tr2 = document.createElement('tr');
        table.firstChild.appendChild(Tr2);
    }
    for(let a = 1; a <= countPlace.length; a++){
        let Td = document.createElement('td');
        Td.innerHTML =`<td><input type="checkbox" class="input_data" name="tseremonii">${a}</td>`;

        if(a % 2 == 0){
            table.firstChild.children[1].appendChild(Td);
        }
        else{
            table.firstChild.children[0].appendChild(Td);
        }
        if(arrPlace[a] == 1){
            Td.firstChild.disabled = true;
        }
    }
    totalBlock.before(table);
}
function InitLists(){
    InitPoolRice();
    for(let i = 0; i < arrRice.ArrRice.length; i++){ 
        let optDir = document.createElement('option');
        optDir.textContent = arrRice.ArrRice[i].Direction;
        SelectDirection.appendChild(optDir);
    
        let optDate = document.createElement('option');
        optDate.textContent = TakeDateInt(arrRice.ArrRice[i].Date);
        SelectDate.appendChild(optDate);
    }
  //  document.getElementById('SelectDirection').onchange = ChangeSelectDate;
//    ChangeSelectDate();
    totalPrice = totalPriceVal;
}
function ChangeSelectDate(){
    while (SelectDate.firstChild) {
        SelectDate.removeChild(SelectDate.firstChild);
      }
    for(item of arrRice.ArrRice){
        if(item.Direction == SelectDirection.value){
            let Option = document.createElement('option');
            Option.label = TakeDateInt(item.Date);
            SelectDate.appendChild(Option);
        }
    }
CreateTable();
RefreshTickets();
}
function TakeDateInt(date){
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return (day + '.' + month +'.' + year);
}
function BuyBook(){
    let numberPlace;
    let countChoicePlace = 0;
    let choicePlace;
    for(item of ticketsNum.firstChild.children){
        for(itemTr of item.children){
            if(itemTr.firstChild.checked && itemTr.firstChild.disabled == false){
                countChoicePlace++;
                choicePlace = itemTr.firstChild;
                itemTr.firstChild.disabled = true;
                numberPlace = itemTr.textContent;                     
            
                for(item = 0; item < arrRice.ArrRice.length; item++){
                    if(SelectDirection.value == arrRice.ArrRice[item].Direction){
                    arrRice.ArrRice[item].places[numberPlace] = 1;
                    }              
                }
                let newTickets = new Ticket(SelectDate.children[0].label,SelectDirection.value,numberPlace);
                arrTickets.push(newTickets);
                AddTickets(arrTickets[arrTickets.length - 1]);
            }
        }
    } 
    totalPrice.firstChild.textContent = 0;
}
function RefreshTickets(){
    while (myTicketsTable.children[0].children.length != 1) {
        myTicketsTable.children[0].removeChild(myTicketsTable.children[0].lastChild);
      }
    for(tickets of arrTickets){
        if(tickets.Direction == SelectDirection.value){
            AddTickets(tickets);
        }
    }
}
function AddTickets(tickets){
    let Tr = document.createElement('tr');
    let TdDirection = document.createElement('td');
    TdDirection.textContent = tickets.Direction;
    Tr.append(TdDirection);

    let TdDate = document.createElement('td');
    TdDate.textContent = tickets.Date;
    Tr.append(TdDate);

    let TdPlace = document.createElement('td');
    TdPlace.textContent = tickets.Place;
    Tr.append(TdPlace);

    myTicketsTable.lastChild.appendChild(Tr);
}

function SearchPress(){
    BookButton.disabled = false;
    CreateTable();
    RefreshTickets();
    ChangeSelectDate();
}
const PRICE = 40;
function ShowPrice(){
    let countPlace = 0;
    for(item of ticketsNum.firstChild.children){
        for(itemTr of item.children){
            if(itemTr.firstChild.checked){
                countPlace++;
            }
        }
    } 
    totalPrice.firstChild.textContent = Number(countPlace * PRICE);
}