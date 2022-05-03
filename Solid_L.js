/**
*
* SOLID
* S - Single Responsibility Principle
* O - Open Closed Principle
* L - Liskov Substitution Principle <--
* I - Interface Segregation Principle
* D - Dependency Inversion Principle
*
*/

//If any class is inheriting base class then it should behave exactly same in children class.
//In this solution, we can see that `useIt` function accepts rectangle class as parameter. So Square class is also inheriting rectangle class, then result
// should be same for square class. but it is not.

class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get width() { return this._width; }
    get height() { return this._height; }

    set width(value) { this._width = value; }
    set height(value) { this._height = value; }

    get area() {
        return this._width * this._height;
    }

    toString() {
        return `${this._width}×${this._height}`;
    }
}

class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    }

    set width(value) {
        this._width = this._height = value;
    }

    set height(value) {
        this._width = this._height = value;
    }
}

let useIt = function (rc) {
    let width = rc._width;
    rc.height = 10;
    console.log(
        `Expected area of ${10 * width}, ` +
        `got ${rc.area}`
    );
};


let r = new Rectangle(10, 20);
useIt(r);

let sq = new Square(15);
useIt(sq);