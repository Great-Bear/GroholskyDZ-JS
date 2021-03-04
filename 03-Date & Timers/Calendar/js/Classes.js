
 class ExtendedDate extends Date
{
 static monthInString = [
  'zero',
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
    31,
 ]


 static GetMonthStr(index)
 {
    if(index <= 0 || index > 12)
        return 'Incorrect month';

    return ExtendedDate.monthInString[index] + ' ';
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
    else if (index < 40)
    {
        if(index - 30)
                return 'thirtieth-' + ExtendedDate.DayString[index - 30] + ' ';
            else
                return 'thirtieth ';
    }
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
 static GetCountMonth(index){
    if(!index) return;

    if(index > 12) return;

    return ExtendedDate.countDayMonth[index];
}

isLeapYear(year){

 if(year <= 0) return 'Incorrect year';    
    

 if( ((year % 4 == 0 && year % 100 !=0) || (year % 400 == 0) ))
  return true;

  return false;
}

static Nextdate(date)
{

    if(date.getDate() <  ExtendedDate.GetCountMonth(date.getMonth() + 1))
        date.setDate(date.getDate() + 1);
    else
        return 'day in this month is max';
}


}


class ColorMarker{

    static  #PRICE_SIMBOL = 0.5;
  
    static  get PRICE_SIMBOL(){
          return this.#PRICE_SIMBOL;
      }

    #colorMarker = 'none';
        set ColorMar(value){
            this.#colorMarker = value;
        }
        get ColorMar(){
            return this.#colorMarker;
        }

    #countInk = 50;
        set CountInk(value){
            this.#countInk = value;
        }
        get CountInk(){
            return this.#countInk;
        }

 
    constructor(colMarker){
        if(typeof colMarker != 'string') return 'color must be string';

        this.ColorMar = colMarker;
        this.CountInk = 50;
    }

WriteColText(placePrint,textPrint){
    let countSimbol = textPrint.value.length;

    if(countSimbol > (this.CountInk / ColorMarker.PRICE_SIMBOL))
        return 'Marker don`t have ink';

        let colorText = document.createElement('span');
        colorText.style.color = this.ColorMar;
        colorText.textContent = textPrint.value;
        placePrint.appendChild(colorText);


    this.CountInk = this.CountInk - ColorMarker.PRICE_SIMBOL * countSimbol;
}
}

class ColorMarkerPro extends ColorMarker{


    constructor(color,display = undefined){
        super(color);
         if(display != undefined)
            display.textContent = super.CountInk;
    }

    RefuelMarker(kernel,count){
        if(kernel.value - count < 0) {
            return 'kernel don`t have such ink';
        }    

        if(Number(count) + Number(super.CountInk) > 100) {

        return 'value ink can not be more 100';
        }

        super.CountInk += Number(count);

        kernel.value -= count;
    }

}
class Kernel{

    value;
    constructor(value){
        this.value = value
    }

}

class PencilCase{

    markers = Array();

AddNewMarker(marker){
    this.markers.push(marker);
}

TakeMarker(id){
    return this.markers[id];
}

}

class StateBool{
    #stateOne;
        set StateOne(value){
            this.#stateOne = value;
        }
        get StateOne(){
            return this.#stateOne;
        }

    #stateTwo;
        set StateTwo(value){
            this.#stateTwo = value;
        }
        get StateTwo(){
            return this.#stateTwo;
        }
     
    #currentState = 'none';
        set CurrentState(value){
            this.#currentState = value;
        }
        get CurrentState(){
            this.ChangeState();
            return this.#currentState;
        }

    constructor(stateOne,stateTwo){
        this.StateOne = stateOne;
        this.StateTwo = stateTwo;
        this.CurrentState = stateOne;
    }

ChangeState(){
    if(this.#currentState == this.StateOne){
        this.CurrentState = this.StateTwo;
    }
    else{
        this.CurrentState = this.StateOne;
    }
}


}