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

const Color = Object.freeze({
    red: "red",
    green: "green",
    blue: "blue"
});

const Size = Object.freeze({
    small: "small",
    medium: "medium",
    large: "large"
})

class Product {
    constructor(name, color, size){
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProductFilter {
    //increasing method will cause state space explosion.
    filterByColor(products, color){
        return products.filter(p => p.color === color);
    }

    filterBySize(products, size){
        return products.filter(p => p.size === size);
    }

    filterBySizeAndColor(products, color, size){
        return products.filter(p => p.color === color && p.size === size);
    }
}

class ColorSpecification {
    constructor(color){
        this.color = color;
    }
    isSatisfied(item){
        return item.color === this.color;
    }
}

class SizeSpecification {
    constructor(size){
        this.size = size;
    }
    isSatisfied(item){
        return item.size === this.size;
    }
}

class AndSpecification {
    constructor(...specs){
        this.specs = specs;
    }
    isSatisfied(item){
        return this.specs.every(spec => spec.isSatisfied(item));
    }
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

const pf = new ProductFilter();
// let pf.filterByColor(products, Color.green);
console.log('Green products (old):')
for(let product of pf.filterByColor(products, Color.green)){
    console.log(`${product.name} is green`);
}

class BetterFilter {
    filter(products, spec){
        return products.filter(p => spec.isSatisfied(p));
    }
}

console.log('Green products (new):')
let bf = new BetterFilter();
for(let p of bf.filter(products, 
    new ColorSpecification(Color.green))
    ){
    console.log(`${p.name} is green`);
}

console.log('Large and green products:')
let spec = new AndSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
);

for(let p of bf.filter(products, spec)){
    console.log(`${p.name} is green and large`);
}