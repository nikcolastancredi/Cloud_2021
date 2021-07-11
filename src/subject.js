
class Subject {
    constructor (){
        this.observers = [];
    }

    addObserver(observer){
        this.observers.push(observer);
    }
    
    change(album,artist){
        this.observers.foreach( o=> o.update(album,artist));
        
    }
}


module.exports = {
    Subject
};