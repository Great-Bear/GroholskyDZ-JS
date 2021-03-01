
class ExtendedDate extends Date
{
 static monthInString = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Octobe',
  'November',
  'December',
  ]

 static DayString = [
     'zero',
     'first',
     'second',
     'third',
     'fourth',
     'fifth',
     'sixth',
     'seventh',
     'eighth',
     'ninth',
     'tenth',
     'eleven',
     'twelve',
     'thirteen',
     'fourteen',
     'fifteen',
     'sixteen',
     'seventeen',
     'eighteen',
     'nineteen',
 ]


 GetMonthStr(index)
 {
    if(index <= 0 || index > 12)
        return 'Incorrect month';

    return ExtendedDate.monthInString[index - 1] + ' ';
}
 GetDayStr(index)
 {
    if(index <= 0)
      return 'Incorrect date';

    if(index < 20)
        return ExtendedDate.DayString[index] + ' ';
    
    else if(index < 30){

        if(index - 20)
            return 'twenty-' + ExtendedDate.DayString[index - 20] + ' ';
        else
            return 'twenty ';
    }      
    
    if(index - 30)
            return 'thirtieth-' + ExtendedDate.DayString[index - 30] + ' ';
        else
            return 'thirtieth ';
}

 GetDateStr(day,month){

        let dayStr = this.GetDayStr(day);
        let monthStr = this.GetMonthStr(month);
        return dayStr + monthStr;    
}

DateIsNotPast(dateInput){

    if(dateInput.getTime() <  super.getTime()) return false;
    
    return true;
}


isLeapYear(year){

 if( ((year % 4 == 0 && year % 100 !=0) || (year%400 == 0) ))
  return true;

  return false;
}

}

function ShowdateStr(day,month){

        let date = new ExtendedDate();
        answerBlock.textContent = date.GetDateStr(day,month); 
}


function DateIsNotPast(dateInput){

    let date = new ExtendedDate();

  if(date.DateIsNotPast(dateInput))

    answerBlock.textContent = 'Date is more than current or is current';
  else
    answerBlock.textContent = 'Date is past date';

}
    
function IsLeapYear(year){
    if(year <= 0){
        answerBlock.textContent = 'Incorrect year';
        return;
    }
  

    let date = new ExtendedDate();

   if(date.isLeapYear(year))
        answerBlock.textContent = 'year is leap';
    else
    answerBlock.textContent = 'yeal is not leap';

}

