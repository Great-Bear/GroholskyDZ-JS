class Rice{
    #direction;
        set Direction(value){
            this.#direction = value;
        }
        get Direction(){
            return this.#direction;
        }
    #date;
    set Date(value){
        this.#date = value;
    }
    get Date(){
        return this.#date;
    }
    constructor(direction,date){
       

        this.Direction = direction;
        this.Date = date;
    }
}
class PoolRice{
    #arrRice = new Array;
        set ArrRice(value){
            this.#arrRice = value;
        }
        get ArrRice(){
            return this.#arrRice;
        }
}