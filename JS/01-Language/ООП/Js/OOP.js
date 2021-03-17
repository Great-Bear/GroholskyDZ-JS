function include(url) {
    let script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
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


let pencileCase = new PencilCase();

function CreteMarkers(arrColor){

for(color of arrColor){
    pencileCase.AddNewMarker(new ColorMarker(color));
}
}

function PrintColorText(idMarker){
   let marker = pencileCase.TakeMarker(idMarker);
    
  answerBlock.textContent = marker.WriteColText(colorText,colMarkerText);

}


let proColorMark = new ColorMarkerPro('red');
let kernel = new Kernel(200);

function RefuelMark(kernel,count){

   answerBlock.textContent = proColorMark.RefuelMarker(kernel,count);
    valueProMark.textContent = proColorMark.CountInk;
}

function ShowCountInk(){
    valueProMark.textContent = proColorMark.CountInk;
}

