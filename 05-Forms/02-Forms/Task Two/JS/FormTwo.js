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
let test = new Test(cQuestinsArr,cAnswersArr);
let test2 = new Test(cQuestinsArr2,cAnswersArr2);
    gExam = new Exam([test,test2]);
}
let gIdTest = 0;
let gCurrentTest = undefined;
const cTimePassExam = 9;
let gSecondsLeft = cTimePassExam;
function CreateTest(){
    answerButt.hidden = false;
    startTestButt.hidden = true;
    restartButt.hidden = true;
    time.textContent = `Осталось: 10 секунд`;
    if(gIdTest == gExam.TestArr.length){
        clearInterval(grefreshIntervalId);       
        alert(`Поздравляю тест стан на ${gTotalResult} баллов`);   
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
    CreateTest();
}
