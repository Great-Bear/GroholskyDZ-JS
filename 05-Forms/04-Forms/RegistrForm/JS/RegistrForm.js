let gCheckObj = new CheckForm();
const cSeparete = ';';
function CheckInputDate(){
   try{
      errEmail.textContent = gCheckObj.CheckEmail(email.value);
      errPassword.textContent = gCheckObj.CheckPsswd(password.value);
      errConfirmPsswd.textContent = gCheckObj.CheckConfirmPsswd(password.value,confirmPsswd.value);
   }
   catch(err){
     // alert(err);
   }
   SaveUserData();
   CloseRegWin();
   OpenUserBlock();
   return false;
}
function ChechUserInputDate(){
   try{
      errFirstName.textContent = gCheckObj.CheckFirstName(firstName.value);
      errLasrName.textContent = gCheckObj.CheckLastName(lastName.value);
      errBirthDay.textContent = gCheckObj.CheckBirthDay(birthDay.value);
      errSelect.textContent = gCheckObj.CheckSelect(sexSelect.selectedIndex);
      errPhoneNum.textContent = gCheckObj.CheckNumberPhone(phoneNum.value);
      errSkype.textContent = gCheckObj.CheckSkype(skype.value);
   }
   catch(err){
      //alert(err);
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
      document.cookie = `${inptElem.id}=${inptElem.value}`;
   }
   document.cookie = `sexSelect=${sexSelect.selectedIndex}`;
}
function LoadCookie(){
   if(!document.cookie.length){
      CloseUserInfoBlock();
      OpenRegWin();
      return;
   }
   else{
      CloseRegWin();
      OpenUserBlock();
      userInfoBlock.hidden = false;
   }
  
}
function deleteCookie(name) {
   let cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		let eqPos = cookie.indexOf("=");
		let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
		document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
 }
function LoadUserBlockData(){
   let cookiesData = document.cookie.split(cSeparete);
   let DataArr = Array();
   for(id of cookiesData){
      let idR = id.replace(' ','');
      DataArr.push(idR);
   }
   let indexCook = 0;
   for(itemCook of DataArr){
      let nameElem = itemCook.substr(0,itemCook.indexOf('='));
      let obj = document.getElementById(nameElem);
      if(obj.nodeName == 'SELECT'){
         obj.selectedIndex = itemCook.substr((itemCook.indexOf('=') + 1));
         indexCook++;
         continue;
      }
      obj.value = itemCook.substr(itemCook.indexOf('=') + 1);
      indexCook++;
   }
}
 function ClearAllInput(){
    for(itemInput of document.getElementsByTagName('input')){
       if(itemInput.type == 'text'){
          itemInput.value = '';
       }
       else{
         itemInput.textContent = '';
       }
    }
 }
 function RegisterAgain(){
   ClearAllInput();
   deleteCookie();
   CloseUserInfoBlock();
   OpenRegWin(); 
   return false;
 }
 function CloseRegWin(){
   registForm.hidden = true;
   registBlock.style.width = 0;
   registBlock.style.padding = 0;
 }
 function OpenRegWin(){
   registForm.hidden = false;
   registBlock.style.width = 300 + 'px';
   registBlock.style.paddingTop = 1 +'px';
   registBlock.style.paddingLeft = 30 + 'px';
   registBlock.style.paddingRight = 30 + 'px';
   registBlock.style.paddingBottom = 20 + 'px';
 }
 function CloseUserInfoBlock(){
   userInfoBlock.style.width = 0;
   userInfoBlock.style.height = 0;
   userInfoBlock.style.padding = 0;
   userInfoForm.hidden = true;
 }
 function OpenUserBlock(){
    LoadUserBlockData();
   userInfoBlock.style.width = 600 + 'px';
   userInfoBlock.style.height = 290 + 'px';
   userInfoBlock.style.paddingLeft = 20 + 'px';
   userInfoBlock.style.paddingRight = 20 + 'px';
   userInfoBlock.style.paddingYop = 10 + 'px';
   userInfoForm.hidden = false;
   userName.textContent = `Hello ${email.value}!`;
 }
