var products = [
    {id : 5, name : "Pen", cost : 60, units : 50},
    {id : 6, name : "Hen", cost : 50, units : 80},
    {id : 9, name : "Ten", cost : 90, units : 30},
    {id : 2, name : "Den", cost : 10, units : 90},
    {id : 4, name : "Zen", cost : 70, units : 20}
]

console.log("default product list");
console.table(products);
var sort = function sort(products){
    for(var i=0; i<products.length-1; i++)
        for(var j=i + 1; j<products.length; j++){
            if (products[i].id > products[j].id){
                var temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
}
console.log("After default sorting")
sort(products);
console.table(products);

var sort = function sort(products, comparer){
    for(var i=0; i<products.length-1; i++)
        for(var j=i + 1; j<products.length; j++){
            if (comparer(products[i], products[j]) > 0){
                var temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
}

var costComparer = function(p1, p2){
    if (p1.cost < p2.cost ) return -1;
    if (p1.cost > p2.cost ) return 1;
    return 0;
}
sort(products,costComparer);
console.log("Sorted by cost");
console.table(products);


var filter = function filter(products){
    var result = [];
    for(var i=0; i<products.length; i++)
        if (products[i].cost >= 50)
            result.push(products[i]);
    return result;
}

console.log("All costly products");
console.table(filter(products));


var filter = function filter(list, predicateFn){
    var result = [];
    for(var i=0; i<list.length; i++)
        if (predicateFn(list[i]))
            result.push(list[i]);
    return result;
}

var costlyProductPredicate = function(p){ return p.cost >= 50};

var costlyProducts = filter(products, costlyProductPredicate);
console.log("All costly products");
console.table(costlyProducts);

function not(predicate){
    return function(){
        return !predicate.apply(this,arguments);
    }
}
/*var affordableProductPredicate = function(p){
    return p.cost < 50;
}*/

var affordableProductPredicate = not(costlyProductPredicate);
var affordableProducts = filter(products, affordableProductPredicate);
console.log("affordable products");
console.table(affordableProducts);

