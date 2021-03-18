const cQuestinsArr =
[
    'Для чего нужен javaSctipt?',
    'Для создания самостоятельной исполняемой программы',
    'Для обработки событий на web-странице',
    'Для добавления динамики и \'интилекта\' в web-страницу',
    'Все варианты'
]
const cAnswersArr = 
[
    0,
    1,
    1,
    0,
]
const cQuestinsArr2 =
[
    'Такой вопрос',
    'Здесь ответ',
    'Тут ответ',
    'Там ответ',
    'Галочку ставить здесь надо'
]
const cAnswersArr2 = 
[
    0,
    0,
    0,
    1,
]

let gExam;
function InitTest(){
   ShowHistory();

        let test = new Test(cQuestinsArr,cAnswersArr);
        let test2 = new Test(cQuestinsArr2,cAnswersArr2);
        gExam = new Exam([test,test2]);
   
}
let gIdTest = 0;
let gCurrentTest = undefined;
const cTimePassExam = 9;
let gSecondsLeft = cTimePassExam;
let gNameParetn = /[a-z]/i;
function CreateTest(){
    answerButt.hidden = false;
    startTestButt.hidden = true;
    restartButt.hidden = true;
    time.textContent = `Осталось: 10 секунд`;
    if(gIdTest == gExam.TestArr.length){
        clearInterval(grefreshIntervalId);   
        let nameUser = 'name';
        let errMessage = '';
        do{
            nameUser = prompt('Enter yout name\nUser only letters' + errMessage,'name');
            errMessage = '\nIncorrect name';
        }while(!gNameParetn.test(nameUser));
        
        SaveCookies(nameUser);   
        alert(`Поздравляю ${nameUser}, тест стан на ${gTotalResult} баллов из ${gMaxRightAnswer} попытка ${coutrPass}`);
        time.textContent = '';
        numberTest.textContent = '';
        answerButt.hidden = true;
        restartButt.hidden = false; 
        document.body.removeChild(document.getElementById(`testBlock${gIdTest - 1}`)); 
    }
    if(gIdTest < gExam.TestArr.length){
        gCurrentTest == undefined ? gCurrentTest : gCurrentTest.hidden = true;
        block = document.createElement('div');
        block.id = `testBlock${gIdTest}`;
        block.style.backgroundColor = 'blanchedalmond';
        for(let i = 0; i < gExam.TestArr[gIdTest].QuestionArr.length; i++){
            if(i != 0){
                let inputElem = document.createElement('input');
                inputElem.type = 'checkbox';
                inputElem.id = i;
                block.appendChild(inputElem);
            }
            let labelElem = document.createElement('label');
            labelElem.htmlFor = i;
            labelElem.textContent = gExam.TestArr[gIdTest].QuestionArr[i];
            block.appendChild(labelElem);
            let brElem = document.createElement('br');
            block.appendChild(brElem);
            gCurrentTest = block;          
        }
        answerButt.before(block);
    }
    else{
       // CalcResultCurrTest();
        return;
    }
    gIdTest++
    numberTest.textContent = `Вопрос №${gIdTest}`;   
    grefreshIntervalId = setInterval(Timer, 1000);
}
const cMaxCoutnPassExam = 5;
let coutrPass = 1;
function SaveCookies(nameUser){
    for(item of document.cookie.split(';'))
    {         
        let nameProperty = item.substring(0,item.indexOf('='));
        if(nameProperty[0] == ' '){
            nameProperty = nameProperty.substring(1,nameProperty.length);
        }
        if(nameProperty == 'coutrPass'){
            coutrPass = item.substring(item.indexOf('=') + 1);
            coutrPass++
        }
    }
    CookiesDelete();
    if(coutrPass <= cMaxCoutnPassExam){
        document.cookie = `name=${nameUser}`;
        document.cookie = `lastMark=${gTotalResult}`;
        document.cookie = `coutrPass=${coutrPass}`;
    }
    else{
        alert('Soryy,but you sped all 5th attempts')
    }
}

function ShowHistory(){  
    if(!document.cookie){
        alert('you stil don`t pass this exam');
        return;
    }
    let message = new String();
    for(item of document.cookie.split(';')){
        let nameCookie = TakeNameCookie(item);
        if(nameCookie == 'name'){
            message += `Hello ${TakeValueCookies(item)}`
        }
        else if(nameCookie == 'lastMark'){
            coutrPass = TakeValueCookies(item);
            message += ` your last masrk is ${coutrPass}`; 
        }
        else if(nameCookie == 'coutrPass'){
            coutrPass = TakeValueCookies(item);
            if(coutrPass == cMaxCoutnPassExam){
                startTestButt.disabled = true;
                answerButt.disabled = true;
                alert('Sorry you spend all opportunity to pass exam');
                return false;
            }
        }
    }
    alert(message);
    return true;
}
function TakeNameCookie(line){
    let nameProperty = line.substring(0,line.indexOf('='));
    if(nameProperty[0] == ' '){
        nameProperty = nameProperty.substring(1,nameProperty.length);
    }
    return nameProperty;
}
function TakeValueCookies(line){
    return line.substring(line.indexOf('=') + 1);
}
function CookiesDelete() {
	let cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		let eqPos = cookie.indexOf("=");
		let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
		document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}
let grefreshIntervalId
function Timer(){
    time.textContent = `Осталось: ${gSecondsLeft} секунд`;
    if(gSecondsLeft <= 0){     
        clearInterval(grefreshIntervalId);       
        alert('Время для этого экзамена вышло, нажмите ок чтобы проходить тест дальше');
        gSecondsLeft = cTimePassExam + 1;      
        CreateTest();
    }
    gSecondsLeft--;
}
let gTotalResult = 0;
let gMaxRightAnswer = 0;
function CalcResultCurrTest(){
    clearInterval(grefreshIntervalId);
    let testBlock = document.getElementById(`testBlock${gIdTest - 1}`);
    let numberQuestion = 0; 
    for(item of testBlock.children){
        if(item.nodeName == 'INPUT'){
            if(gExam.TestArr[gIdTest - 1].AnswersArr[numberQuestion] == item.checked &&
                gExam.TestArr[gIdTest - 1].AnswersArr[numberQuestion] == 1){
                gTotalResult++;
            }
            if(gExam.TestArr[gIdTest - 1].AnswersArr[numberQuestion] == true){
                gMaxRightAnswer++;
            }
            numberQuestion++;
        }  
    }
}
function AnswerButtPress(){
    gSecondsLeft = cTimePassExam;
    CalcResultCurrTest();
    CreateTest();
}
function Restart(){
    gTotalResult = 0;
    gIdTest = 0;
    gMaxRightAnswer = 0;
    if(ShowHistory()){
        CreateTest();
    }
   
}
