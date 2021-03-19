class PaternPoll{
    #shortNamePatern
        get ShortNamePatern(){
            return this.#shortNamePatern;
        }
        set #ShortNamePatern(value){
            this.#shortNamePatern = value;
        }
        constructor(){
            this.#ShortNamePatern = /^[А-Я]{1}[а-я]+[А-Я]{2}$/
        }
    #onlyLetterPartn = /[а-я]/i;
    #bigFirstLetterParetn = /^[А-Я]{1}.?/;
    #initialEnd = /[А-Я]{2}$/;
    CheckShortName(name){
        if(!this.ShortNamePatern.test(name)){
            if(!this.#onlyLetterPartn.test(name)){           
                return 'use only rus letter';
            }
            else if(!this.#bigFirstLetterParetn.test(name)){
                return 'first letter must be Big';
            }
            else if(!this.#initialEnd.test(name)){
                return 'Initial is not correct'
            }
            else{
                return 'Incorrect name';
            }          
        }
        return '';
    }
    #emailPatern = /^[a-z]{1}[a-z0-9_]{2,15}@{1}[a-z]{2,3}$/i;
    CheckEmail(email){
            if(!this.#emailPatern.test(email)){
                return 'incorrect email';
            }
    }
/*
01 - 31 день
03 - 31 день
05 - 31 день
07 - 31 день { 01,03,05,07,08,10,12}
08 - 31 день
10 - 31 день
12 - 31 день

04 - 30 дней
06 - 30 дней {04,06,09,11}
09 - 30 дней
11 - 30 дней

02 - 28 дней (29 в високосном)
*/
// 31 day 31 0?[135781]|1[02]$
    #dataPatern = /^(30-0?[469]|11|31-0?[135781]|1[02]|28-0?2)-\d{1,4}$/;
    CheckData(data){
        if(!this.#dataPatern.test(data)){      
            return 'Incorrect data';
        }
    }

}