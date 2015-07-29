/* Sync */

function addSync(x,y){
    console.log("[SP] data received...");
    var result = x + y;
    console.log("[SP] returning result...");
    return result;
}

function addSyncClient(x,y){
    console.log("[SC] triggering add...");
    var result = addSync(x,y);
    console.log("[SC] result = ", result);
}

/* Async using Callback*/

function addAsync(x,y,onResult){
    console.log("[SP] data received...");
    setTimeout(function(){
        var result = x + y;
        console.log("[SP] returning result...");
        onResult(result);
    },3000);
}

function addAsyncClient(x,y){
    console.log("[SC] triggering add...");
    addAsync(x,y, function(result){
        console.log("[SC] result = ", result);
    });
}


/* Async using Events */

function getAdder(){
    var callbacks = [];
    function notifyResult(result){
        callbacks.forEach(function(callback){
            callback(result)
        });
    }
    return  {
        add : function(x,y){
            console.log("[SP] data received...");
            setTimeout(function(){
                var result = x + y;
                console.log("[SP] returning result...");
                notifyResult(result);
            },3000);
        },
        subscribe : function(callback){
            callbacks.push(callback);
        }
    }
};

function addAsyncEventsClient(x,y){
    var adder = getAdder();
    
    console.log("[SC] triggering add...");
    adder.add(x,y);
    return adder;
}

/* Async Using Promise*/

function addAsyncPromise(x,y){
    console.log("[SP] data received...");
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
                var result = x + y;
                console.log("[SP] returning result...");
                resolve(result);
            },3000);
        });
    return promise;
}

var p = addAsyncPromise(100,200);
p.then(function(result){
    console.log("result = ", result);
})
