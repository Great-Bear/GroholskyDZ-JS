let gCheckObj = new CheckForm();
const cSeparete = ';';
function CheckInputDate(){
   try{
      errEmail.textContent = gCheckObj.CheckEmail(email.value);
      errPassword.textContent = gCheckObj.CheckPsswd(password.value);
      errConfirmPsswd.textContent = gCheckObj.CheckConfirmPsswd(password.value,confirmPsswd.value);
   }
   catch(err){
      alert(err);
   }
  SaveUserData();
   return false;
}
function SaveUserData(){
   for(errLabel of document.getElementsByClassName('errLabel')){
      if(errLabel.textContent){
         return false;
      }
   }
   for(inptElem of document.getElementsByTagName('input')){
      document.cookie = `${inptElem.id}=${inptElem.value}${cSepareta}`;
   }
}
function LoadCookie(){
   let DataArr = document.cookie.split(cSeparete);
   let indexCook = 0;
   for(inptElem of document.getElementsByTagName('input')){
      if(inptElem.type == 'text'){
         inptElem.value = DataArr[indexCook].substring(DataArr[indexCook].indexOf('=') + 1);
      }
      else if(inptElem.type == 'password'){
         inptElem.textContent = DataArr[indexCook];
      }
      indexCook++;
   }
   registBlock.hidden = true;
   CloseRegWin();
  // document.location.href = '/UserInfo.html';
}
function deleteCookie(name) {
   var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
		document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
 }
 function CloseRegWin(){
   registForm.hidden = true;
   registBlock.style.width = 0;
   registBlock.style.padding = 0;
 }