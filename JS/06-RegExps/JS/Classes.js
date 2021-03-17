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
    #bigFirstLetterParetn = /^[А-Я]{1}./;
    CheckShortName(name){
        if(!this.ShortNamePatern.test(name)){
            if(!this.#onlyLetterPartn.test(name)){           
                return 'use only rus letter';
            }
            else if(!this.#bigFirstLetterParetn.test(name)){
                return 'first letter must be Big';
            }
            else{
                return 'Initial is not correct'
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

}