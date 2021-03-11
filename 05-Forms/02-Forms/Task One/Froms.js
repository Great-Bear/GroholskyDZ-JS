function ResetForm(container){
    for(item of container.children){
        if(item.nodeName == 'DIV'){
            ResetForm(item);
        }
        if(item.nodeName == 'INPUT'){
            if(item.type == 'text'){
                item.value = '';
            }
            else{
                item.checked = false;
            }
        }
        if(item.nodeName == 'SELECT'){
            item.selectedIndex = 0;
        }
    }
}
let gFullTxt = true;
let gChoiceRadio = false;
let gCheckBox = 0;
let gSelected = false;
function ResetCheckFilds(){
    gChoiceRadio = false;
    gFullTxt = true;
    gCheckBox = 0;
    gSelected = false;
}
function sendForm(container){
    CheckForm(container);
    let messageError = CreateMessageError();
    if(messageError.length != 0){
        alert(messageError);
    }
    else{
        registrBlock.hidden = true;
        tableData.hidden = false;
        FillTable();
    }  
    ResetCheckFilds();
}
let ginputDataUser = new String();
function CheckForm(container){
    for(item of container.children){
        if(item.nodeName == 'DIV'){
            CheckForm(item);
            continue;
        }
        if(item.nodeName == 'INPUT'){
            if(item.type == 'text'){
                if(item.value.length == 0){
                    gFullTxt = false
                    break;
                }
                else{
                    if(item.id != 'password' && item.id != 'confirmPasswd')
                        ginputDataUser += item.value + '/';
                }              
            }
            else if(item.type == 'password'){
                if(item.value.length == 0){
                    gFullTxt = false
                    break;
                }
                else{
                    if(item.id != 'password' && item.id != 'confirmPasswd')
                        ginputDataUser += item.value + '/';
                }              
            }
            else if(item.type == 'radio'){
               if(item.checked){
                 gChoiceRadio = true;
                 let sex;
                    if(item.nextSibling.data[0] == 'M'){
                        ginputDataUser += 'Man';
                    }
                    else{
                        ginputDataUser += 'Women';
                    }
                 ginputDataUser += '/';               
                }                                
            }
            else if(item.type == 'checkbox'){
                if(item.checked){
                 gCheckBox++;
                 if(gCheckBox == 1){
                    ginputDataUser += item.nextSibling.textContent + '/';
                 }
                }                                    
             }            
        }
        if(item.nodeName == 'SELECT'){
            if(item.selectedIndex != 0){
                gSelected = true;
                ginputDataUser += item.value + '/';
            }
        }
    }
}
const MIN_LENGTH_PASSWD = 3,MAX_LENGTH_PASSWD = 10;
function CreateMessageError(){
    let messageError = new String();
    if(!gFullTxt){
        messageError += 'Not all fields is full\n';
    }
    if(!gChoiceRadio){
        messageError += 'Choice radio\n';
    }   
    if(gCheckBox > 1 || gCheckBox == 0){
        messageError += 'Incorrect count choice checkBox\n';
    }
    if(!gSelected){
        messageError += 'Position is not choice';
    }
    if(password.value.length < MIN_LENGTH_PASSWD || password.value.length > MAX_LENGTH_PASSWD){
        messageError += '\nIncorrect length password';
    }
    if(password.value != confirmPasswd.value){
        messageError += '\nConfirm password unlike';
    }
    return messageError;
}
function FillTable(){

    for(tr of tableData.firstElementChild.children){
        let cutPartStr = ginputDataUser.substring(0,ginputDataUser.indexOf('/'));
        tr.children[1].textContent = cutPartStr;
        ginputDataUser = ginputDataUser.replace(cutPartStr + '/','');
    }
}