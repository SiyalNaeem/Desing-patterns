/**
*
* SOLID
* S - Single Responsibility Principle
* O - Open Closed Principle
* L - Liskov Substitution Principle
* I - Interface Segregation Principle
* D - Dependency Inversion Principle
*
*/

const fs = require('fs');

class Journal {
    constructor(){
        this.entries = {};
    }

    addEntry(text){
        let count = ++Journal.count;
        let entry = `${count}: ${text}`;
        this.entries[count] = entry;
        return count;
    }

    removeEntry(index){
        delete this.entries[index];
    }

    toString(){
        return Object.values(this.entries).join('\n');
    }

    /** THESE METHOD SHOULD HAVE SEPARATE CLASS AS THIS BELONGS TO PERSISTANCE AND ALSO IT WILL HELP US WITH SEPERATION OF CONCERN */
    // save(filename){
    //     fs.writeFileSync(filename, this.toString());
    // }

    // load(){
    //     //
    // }

    // loadFronURL(){
    //     //
    // }

    // preprocess(){
    //     //
    // }
}
Journal.count = 0;

class PersistanceManager {
    save(filename){
        fs.writeFileSync(filename, this.toString());
    }

    load(){
        //
    }

    loadFronURL(){
        //
    }

    preprocess(){
        //
    }

}

const j = new Journal();
j.addEntry('I cried today');
j.addEntry('I ate a bug');

const p = new PersistanceManager();
p.save('journal.txt');

console.log(j.toString());





