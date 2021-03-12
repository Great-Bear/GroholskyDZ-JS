function CheckCorrectInputData(){
    let errMessage = '';
    let passwd = document.getElementsByName('text_password1')[0];
    let confPasswd = document.getElementsByName('text_password2')[0];
    if(passwd != confPasswd){
        errMessage += 'Password and confirm password is unlike';
    }
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return errMessage;
}

function SaveForm(){
    let errMessage = CheckCorrectInputData();
    if(!errMessage.length == 0){
        alert(errMessage);
        return;
    }
    for(trElem of tbodyElem.children){
        for(tdElem of trElem.children){
            if(tdElem.firstElementChild != null){       
                if(tdElem.firstElementChild.nodeName == 'INPUT'){
                    if(tdElem.firstElementChild.type == 'text'){             
                        document.cookie += `${tdElem.firstElementChild.type}=${tdElem.firstElementChild.value}|`;
                    }
                    else if(tdElem.firstElementChild.type == 'password'){             
                        document.cookie += `${tdElem.firstElementChild.type}=${tdElem.firstElementChild.value}|`;
                    }
                    else if(tdElem.firstElementChild.type == 'radio'){    
                        for(itemTd of tdElem.children){
                            if(itemTd.nodeName == 'INPUT'){
                                document.cookie += `${itemTd.type}=${itemTd.checked}|`;
                                itemTd.value;
                            }
                        }                       
                    }
                    else if(tdElem.firstElementChild.type == 'checkbox'){    
                        for(itemTd of tdElem.children){
                            if(itemTd.nodeName == 'INPUT'){
                                document.cookie += `${itemTd.type}=${itemTd.checked}|`;
                                itemTd.value;
                            }
                        }                       
                    }
                }
            }
        }
    }   
    let a = `textarea=${document.getElementsByName('text_info')[0].value}`;
    document.cookie += `select=${document.getElementsByName('list_work')[0].selectedIndex}|`;
    document.cookie += `textarea=${document.getElementsByName('text_info')[0].value}|`;
    document.cookie = a;
}
function ReadCookies(){
let arr = document.cookie.split('|');
let index = 0; 
   for(trElem of tbodyElem.children){
    for(tdElem of trElem.children){
        if(tdElem.firstElementChild != null){       
            if(tdElem.firstElementChild.nodeName == 'INPUT'){
                if(tdElem.firstElementChild.type == 'text'){             
                    tdElem.firstElementChild.value = arr[index].substr(arr[index].indexOf('=') + 1);
                }
                else if(tdElem.firstElementChild.type == 'password'){             
                    tdElem.firstElementChild.value = arr[index].substr(arr[index].indexOf('=') + 1);
                }
                else if(tdElem.firstElementChild.type == 'radio'){    
                    let isMale = true;
                    for(itemTd of tdElem.children){
                        if(itemTd.nodeName == 'INPUT'){                
                            if(isMale && arr[index].substr(arr[index].indexOf('=') + 1) == 'true'){
                                itemTd.checked = isMale;
                                isMale = !isMale;                          
                            }
                             else{
                                 itemTd.checked = isMale;
                             }                                                 
                            index++;                                               
                        }                    
                    }  
                    index--;                   
                }
                else if(tdElem.firstElementChild.type == 'checkbox'){  
                    for(itemTd of tdElem.children){
                        if(itemTd.nodeName == 'INPUT'){
                            let veb = arr[index].substr(arr[index].indexOf('=') + 1);
                            if(veb == 'true'){
                                itemTd.checked = true;
                            }
                            index++;
                        }
                    }   
                    index--                    
                }
                index++;
            }
        }      
    }
}
document.getElementsByName('list_work')[0].selectedIndex = arr[index - 1].substr(arr[index - 1].indexOf('=') + 1);
document.getElementsByName('text_info')[0].value = arr[index].substr(arr[index].indexOf('=') + 1);

   //alert(gData);
}

function deleteAllCookies() {
    let cookies = document.cookie.split(";");
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}