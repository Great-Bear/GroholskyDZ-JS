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
    places = new Array(28);
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
class Ticket{
    #date;
        set Date(value){
            this.#date = value;
        }
        get Date(){
            return this.#date;
        }
    #direction;
        set Direction(value){
            this.#direction = value;
        }
        get Direction(){
            return this.#direction;
        }
    #place;
        set Place(value){
            this.#place = value;
        }
        get Place(){
            return this.#place;
        }
    constructor(date,direction,place){
        this.Date = date;
        this.Direction = direction;
        this.Place = place;
    }
}