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
        this.#PatrnFirtsName = /^[a-z]{1,20}$/;
        // this.#PatrnBirthDay = /19[0-9]{2}|20[0-9]{2}/;
        this.#NumberPhone = /([0-9 ()-])/;;
        this.#MinYearReg = 1900;
        this.#SMinLengthPsswd = 6;
        this.#PatrnSkype = /[^a-z0-9.-]/i;
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
    #patrnFirtsName = new RegExp();
        set #PatrnFirtsName(value){
            this.#patrnFirtsName = value;   
        }
        get PatrnFirtsName(){
            return this.#patrnFirtsName;
        }
    CheckFirstName(firstName){
        if(!firstName){
            return 'first name can`t be empty';
        }
        if(!this.PatrnFirtsName.test(firstName)){
            return 'Incorrect email';
        }
        return '';
    }
    CheckLastName(lastName){
        if(!lastName){
            return 'last name can`t be empty';
        }
        if(!this.PatrnFirtsName.test(lastName)){
            return 'Incorrect email';
        }
        return '';
    }
    #patrnBirthDay = new RegExp();
        set #PatrnBirthDay(value){
            this.#patrnBirthDay = value;   
        }
        get PatrnBirthDay(){
            return this.#patrnBirthDay;
        }

    #minYearReg;
        set #MinYearReg(value){
            this.#minYearReg = value;   
        }
        get MinYearReg(){
            return this.#minYearReg;
        }
    CheckBirthDay(birthDay){
        birthDay = Number(birthDay);
        if(isNaN(birthDay)){
            throw 'Inccorect parametr birthDay is not number';
        }
        if(!birthDay){
            return 'birthDay can`t be empty';
        }
        let date = new Date();
        if( birthDay <  this.MinYearReg || birthDay > date.getFullYear()){
            return 'Incorrect birth of date';
        }
        return '';
    }
    CheckSelect(sexId){
        if(sexId == 0){
            return 'Choice please sex';
        }
        return '';
    }
    #numberPhone = new RegExp();
        set #NumberPhone(value){
            this.#numberPhone = value;   
        }
        get NumberPhone(){
            return this.#numberPhone;
        }
    CheckNumberPhone(phone){
        if(!this.NumberPhone.test(phone)){
            return 'Incorrect number phone';
        }
        if( !/(.*\d.*){2}$/.test(phone) || /(.*\d.*){5}/.test(phone)){
            return 'count int must be 10-12';
        }
    }
    #patrnSkype = new RegExp();
    set #PatrnSkype(value){
        this.#patrnSkype = value;   
    }
    get PatrnSkype(){
        return this.#patrnSkype;
    }
    CheckSkype(skype){
        if(this.PatrnSkype.test(skype)){
            return 'Incorrect using symbol';
        }
    }
}