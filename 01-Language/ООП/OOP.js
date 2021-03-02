
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
 static countDayMonth = [
    0,
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    30,
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
GetCountMonth(index){
    if(!index) return;

    if(index > 12) return;

    return ExtendedDate.countDayMonth[index];
}

isLeapYear(year){

 if(year <= 0) return 'Incorrect year';    
    

 if( ((year % 4 == 0 && year % 100 !=0) || (year%400 == 0) ))
  return true;

  return false;
}

Nextdate(date)
{

    if(date.getDate() <  this.GetCountMonth(date.getMonth() + 1))
        date.setDate(date.getDate() + 1);
    else
        return 'day in this month is max';
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
  
    let date = new ExtendedDate();

   if(date.isLeapYear(year))
        answerBlock.textContent = 'year is leap';
   else
    answerBlock.textContent = 'yeal is not leap';

}

function TakeNextdate(dateInput){
    let date = new ExtendedDate();

    let nextDate = date.Nextdate(dateInput)

   if(typeof nextDate == 'string') {
        answerBlock.textContent = nextDate;
        return;
    }
    
    answerBlock.textContent = `${dateInput.getDate()} ${dateInput.getMonth() + 1} ${dateInput.getFullYear()}`
}




class ColorMarker{

    static  #PRICE_SIMBOL = 0.5;
  
    static  get PRICE_SIMBOL(){
        alert('prive');
          return this.#PRICE_SIMBOL;
      }

    colorMarker;
    countInk;


      set ColorMarker(value){
        colorMarker = value;
      }
      get ColorMarker(){
          return colorMarker;
      }

 
    constructor(colMarker,countInk){

        if(typeof colMarker != 'string') return 'color must be string';
        
        if(typeof countInk != 'number') return 'count ink must be number';

        this.colorMarker = colMarker;
        this.countInk = countInk;
    }

WriteColText(placePrint,textPrint){

    let countSimbol = colMarkerText.value.length;

    if(countSimbol > (this.countInk / this.PRICE_SIMBOL))
        return 'Marker do not have such ink';

    colorText.style.color = 'red';
    placePrint.textContent = textPrint

    this.countInk -= 0.5 * countSimbol;

}
}


function PrintColorText(){

    debugger;
    let colorMarker = new ColorMarker('red',1);

    colorMarker.WriteColText(colorText,colMarkerText.value);

}

