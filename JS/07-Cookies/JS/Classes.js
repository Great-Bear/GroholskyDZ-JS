class Test{
    #questionArr = Array();
        set QuestionArr(value){
            this.#questionArr = value;
        }
        get QuestionArr(){
        return this.#questionArr;
        }
    #answersArr = Array();
        set AnswersArr(value){
            this.#answersArr = value;
        }
        get AnswersArr(){
        return this.#answersArr;
        }
    constructor(queastionArr,answersArr){
        /*if(queastionArr.length != answersArr.length || 
           !Array.isArray(queastionArr) || !Array.isArray(answersArr)){
            return
        }*/
        this.AnswersArr = answersArr;
        this.QuestionArr = queastionArr;
    }
}
class Exam{
    #testArr = Array();
        set TestArr(value){
            this.#testArr = value;
        }
        get TestArr(){
            return this.#testArr;
        }

    constructor(tests){
        if(tests instanceof Test){
            this.AddTest(tests);
            return;
        }
        else if(tests instanceof Array){
            for(let i = 0; i < tests.length; i++){
                this.AddTest(tests[i]);
            }
        }
    }

    AddTest(test){
        if(test instanceof Test){
            this.#testArr.push(test);
        }      
    }
}