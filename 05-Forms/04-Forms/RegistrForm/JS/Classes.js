class CheckForm{
    #patrnEmail = new RegExp();  
        set #PatrEmail(value){
            this.#patrnEmail = value;   
        }
        get PatrEmail(){
            return this.#patrnEmail;
        }
    #patrnIncleInt = new RegExp();
        set #PatrnIncleInt(value){
            this.#patrnIncleInt = value;   
        }
        get PatrnIncleInt(){
            return this.#patrnIncleInt;
        }
    constructor(){
        this.#PatrEmail = /[a-z_.-\^\d]{3}@+[a-z_.-\^\d]+\.[a-z_.-\^\d]/i;
        this.#PatrnIncleInt = /[\d]/i;
        this.#PatrnPasswd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/;
        this.#SMinLengthPsswd = 6;
    }
    CheckEmail(data){  
        if(typeof data != 'string'){
            throw 'Incorect Email';
        }
        else if(!data.length){
            return 'Email can`t be empty';
        }
        else if(this.PatrnIncleInt.test(data)){
            return 'Email can`t includes numbers';
        }
        else if(!this.PatrEmail.test(data)){
            return 'Incorrect form email';
        }   
        return ''; 
    }
    #patrnPasswd = new RegExp();
        set #PatrnPasswd(value){
            this.#patrnPasswd = value;   
        }
        get PatrnPasswd(){
            return this.#patrnPasswd;
        }
    #sMinLengthPsswd;
        set #SMinLengthPsswd(value){
            this.#sMinLengthPsswd = value;   
        }
        get SMinLengthPsswd(){
            return this.#sMinLengthPsswd;
        }
    CheckPsswd(data){  
        if(data.length < this.SMinLengthPsswd){
            return 'Password must be more 6 symbol';
        }
        if(!this.PatrnPasswd.test(data)){
            return 'Incorrect password';
        }
        return '';
    }
    CheckConfirmPsswd(psswd,confPsswd){
        if(psswd != confPsswd){
            return 'password must mutch';
        }
        return '';
    }
}