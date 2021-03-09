const HOLIDAY = 'red';
const COLOR_DATE = 'gray';
const ROW_CALENDAR = `<tr>
<td>j</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>`;

const COL_IS_CHOICE = 'yellow', COL_NOT_CHOICE = 'none';
let currentChoice;
function InitCalnedar(title){
    let date = new Date();
    let preDate = new Date(date);
    
    preDate.setMonth(date.getMonth() - 1);
    document.getElementById(title).textContent = `${ExtendedDate.GetMonthStr(date.getMonth() + 1)}`;

    let curDayMonth = 1;
    let countDayPreMonth = date.getDay() - 1 - (date.getDay() - 1);
    let dayNextMonth = 1;

    if(countDayPreMonth < 0 )
        countDayPreMonth = 6;

    const MAX_DATE_PRE_MONTH = ExtendedDate.countDayMonth[preDate.getMonth() + 1];
    const MAX_DATE_CURR_MONTH = ExtendedDate.countDayMonth[date.getMonth() + 1];
   

    for(itemTr of Calendar.firstElementChild.children){
      if(itemTr.id == 'nameMonthTR')
            continue;   

        if(itemTr.nodeName == 'TR'){
            let numberdayWeek = 1;
            for(itemTd of itemTr.children){                
                if(countDayPreMonth){  
                    countDayPreMonth--;                
                    itemTd.textContent = MAX_DATE_PRE_MONTH - countDayPreMonth ;
                    SetColorDate(numberdayWeek,itemTd);
                }
                else if(curDayMonth <= MAX_DATE_CURR_MONTH){           
                    itemTd.textContent = curDayMonth;
                    curDayMonth++;
                        if(date.getDate() == curDayMonth - 1 ){
                            itemTd.style.background = COL_IS_CHOICE;
                            currentChoice = itemTd;
                        }
                }
                else{
                    SetColorDate(numberdayWeek,itemTd);
                    itemTd.textContent = dayNextMonth;
                    dayNextMonth++;                                 
                }  
            numberdayWeek++;              
            }         
        }
        if(itemTr == Calendar.firstElementChild.lastElementChild &&
            curDayMonth <= MAX_DATE_CURR_MONTH){
                 let newRow = document.createElement('tr');
                 newRow.innerHTML = ROW_CALENDAR;
                 Calendar.firstElementChild.appendChild(newRow);
        }
    }
    for(item of nameMonthTR.children){
        item.style.color = 'black';
    }
}

let Choice = new StateBool(COL_NOT_CHOICE,COL_IS_CHOICE);
function SelectDate(){ 
    event.target.style.background = Choice.CurrentState;
    currentChoice.style.background =  Choice.CurrentState;
    currentChoice = event.target;
}
function SetColorDate(day,item){
    if(day % 7 == 0 || day % 6 == 0)
        item.style.color = HOLIDAY;
    else
        item.style.color = COLOR_DATE;
}
