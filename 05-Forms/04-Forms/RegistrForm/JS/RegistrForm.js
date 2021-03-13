let gCheckObj = new CheckForm();

function CheckInputDate(){
   try{
      gCheckObj.CheckEmail(email.value);
   }
   catch(message){
      alert(message);
   }
   return false;
}