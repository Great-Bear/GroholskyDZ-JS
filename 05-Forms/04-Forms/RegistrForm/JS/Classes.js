class CheckForm{
    #patrnEmail = new RegExp();
        set #PatrEmail(value){
        this.#patrnEmail = value;   
        }
        get PatrEmail(){
            return this.#patrnEmail;
        }
    constructor(){
        //@+[a-z]+\.[a-z]
        this.#PatrEmail = /[a-z]{3}/i;
    }
    CheckEmail(data){
       let a = this.PatrEmail.test(data);
       alert(a);
        if(typeof data != 'string'){
            throw 'Incorect Email';
        }
        else if(!data.length){
            throw 'Email cann`t be empty';
        }
       if(this.PatrEmail.test(data)){
         //  throw 'Incorrect email';
       }
      
    }
}