function TakeInfoUser()
{
   let fullName,sex,age,email;

   do{
       fullName = prompt('Enter full name:');
       sex = prompt('Enter sex:');
       age = prompt('Enter age:');
       email = prompt('Enter email:');

   }while(!confirm(`Your:\n` +
                         `name: ${fullName}\n` +
                         `sex: ${sex}\n` + 
                         `age: ${age}\n` +   
                         `email: ${email}\n` + 
                    'All right?'));
}

function LuckyTicket()
{
    const SHORT_NUMBER = 99999, LONG_NUMBER = 1000000;

    while(true){
    let leftSum = 0,rightSum = 0;
    let numberInput = 0;

    do{
        numberInput = parseInt(prompt('Enter your six numbers:'));

        if(numberInput <= SHORT_NUMBER || numberInput >= LONG_NUMBER || isNaN(numberInput)){
            alert('Incorrect input number, enter number again');
            continue;
        }

let receiveLeftPart = 100;
let beforeLast = 10;
let lossLastInt = 10;

        for(let i = 0; i < 3; i++){          

                rightSum += Math.trunc(numberInput % beforeLast);

                numberInput = Math.trunc(numberInput / lossLastInt);

                leftSum += Math.trunc(numberInput / receiveLeftPart) % beforeLast;            
        }      

        confirm(rightSum == leftSum?'Your number is lucky':'Your number is not lucky')

    }while(true);
}
}






const ANSWER_YES = 1, ANSWER_NO = 0, HALF = 2;


function GuessNumber(){
     
do{
    let end = 101, start = -1, middle = 50;
    let answerUser;

    do{
        answerUser = parseInt(prompt(`Is your number ${middle}?\nEnter\n'1' if yes\n'0' if no`));

        if(answerUser != ANSWER_YES && answerUser != ANSWER_NO || isNaN(answerUser)){
            alert('You enter icorrect answer, try again');
            continue;
        }
        else if (answerUser == ANSWER_NO){
            do{          
                 answerUser = parseInt(prompt(`is your number more than ${middle}?\nEnter\n'1' if yes\n'0' if no`));

                    if(answerUser != ANSWER_YES && answerUser != ANSWER_NO || isNaN(answerUser)){
                        alert('You enter incorrect answer, try again');
                        continue;
                    }

                break;
              }while(true)
            
                if(answerUser == ANSWER_NO){
                    end = middle;
                    middle -= Math.trunc((middle - start) / HALF); 
                }
                else
                {
                    start = middle;
                    middle += Math.trunc((end - middle) / HALF);
                 
                }
                continue;
        }
            if(answerUser == ANSWER_YES)
            break;


    }while(true);
    alert(`Your number is ${middle}`);

}while(confirm('Play again?'));
}






const SIZE_ARR_TEST = 3, COUNT_ANSWERS_BE_STOOL = 2;
let quaestionArr =
[
    'Is he a stool??',  
    'Does he think like a stool?',
    'Is he sure not a stool?'
];

let answersArr = new Array(SIZE_ARR_TEST);
let AnswersArrBeStool = [1,1,0];

let isStool = false;
let answer;

function Test(){

    for(let i = 0; i < SIZE_ARR_TEST; i++){
       
      answer = parseInt(prompt(`'1' is yes\n'0' is no\n${quaestionArr[i]}`));

      if(answer != ANSWER_NO && answer != ANSWER_YES || isNaN(answer)){
          alert('Incorrect answer, try again');
          i--;
          continue;
      }

      answersArr[i] = answer;

      if(answer == AnswersArrBeStool[i] && isStool == false)
         isStool = true;

    }

   alert(isStool?'He is a stool':'He is not a stool');
}




function EnterCorrectFullName(){

    let corectSymbol = /[^A-Za-z. ]/

    while(true){

    
        let fullName = prompt('Enter Full name\nUse only letter, symbol "." and "space"');

        if (corectSymbol.test(fullName)) 
            alert('Incorrect full name');
        else
            alert('Correct full name');
    }
}




let protocol,host,path,nameFile,lineQueastion;
let webString;

function SplitStrDelimiter(newLine,separeteLine,addIndexSeek = 0 ,addLengthSliceStart = 0,seekLastIndex = false){
 
    if(seekLastIndex){
        newLine = webString.substring(0,webString.lastIndexOf(separeteLine) + addIndexSeek);
    }
    else{
        newLine = webString.substring(0,webString.indexOf(separeteLine) + addIndexSeek);
    }

    webString = webString.slice(newLine.length + separeteLine.length - addLengthSliceStart ,webString.length);   
    return newLine;
}

 function SplitHttpAdress(webPathPtr){
    webString = webPathPtr;

    protocol = SplitStrDelimiter(protocol,'://');

    host = SplitStrDelimiter(host,'/',0,1);

    path = SplitStrDelimiter(path,'/',1,1,true);

    nameFile = SplitStrDelimiter(nameFile,'?');

    lineQueastion = webString;    

    alert(`Protocol: ${protocol}\nHost: ${host}\nPath: ${path}\nNameFile: ${nameFile}\nLineQueastin: ${lineQueastion}`);
 }
