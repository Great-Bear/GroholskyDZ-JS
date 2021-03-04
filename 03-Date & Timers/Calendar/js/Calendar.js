function InitCalnedar(title){

    let date = new Date('Marth 4, 2021 03:24:00');
    document.getElementById(title).textContent = `${ExtendedDate.GetMonthStr(date.getMonth() + 1)}`;

    let dayNum = 1;
    for(itemTr of Calendar.firstElementChild.children){
      
        if(itemTr.nodeName == 'TR'){
            for(itemTd of itemTr.children){    
                if(dayNum <= date.getDate()){           
                    itemTd.textContent = dayNum;
                    dayNum++;
                }
                else{
                    ExtendedDate.Nextdate(date);
                    itemTd.textContent = date.getDate();
                    dayNum++;
                }
            }
        }
    }


}


function Click(){
    event.target.style.background = 'yellow';

    date = new Date('Marth 4, 2021 03:24:00');

    a = date.getDay();
        alert(date.getDay());
}