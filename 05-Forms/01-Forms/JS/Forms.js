let arrRice = new PoolRice();


function InitPoolRice(){
    arrRice.ArrRice.push(new Rice('Lviv-Kiev',new Date()));
    arrRice.ArrRice.push(new Rice('Kiev-Lviv',new Date()));
   
}


function InitLists(){
    InitPoolRice();
    for(let i = 0; i < arrRice.ArrRice.length; i++){ 
        let optDir = document.createElement('option');
        optDir.textContent = arrRice.ArrRice[i].Direction;
        SelectDirection.appendChild(optDir);
    
        let optDate = document.createElement('option');
        let day = arrRice.ArrRice[i].Date.getDate();
        let month = arrRice.ArrRice[i].Date.getMonth();
        let year = arrRice.ArrRice[i].Date.getFullYear();
        optDate.textContent = (day + '.' + month +'.' + year);
        SelectDate.appendChild(optDate);
    }
}