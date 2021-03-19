function onLoadFunc(){
   let nameInput = document.getElementById('errNameUser');
   nameInput.addEventListener('click',CheckName);
}

let gPaternPool = new PaternPoll();

function CheckName(){
    errNameUser.textContent = gPaternPool.CheckShortName(nameUser.value);
}
function CheckEmail(){
    errEmailUser.textContent = gPaternPool.CheckEmail(emailUser.value);
}
function CheckData(){
    errDataUser.textContent = gPaternPool.CheckData(dataUser.value);
}