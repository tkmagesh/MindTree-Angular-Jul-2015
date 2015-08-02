describe("greet module", function(){

    beforeEach(module("greet"));

    describe("greetController", function(){

        it("should have the name initialized to empty string", inject(function($controller){

            var dummyScope = {};

            $controller('greetController' , {$scope : dummyScope});

            expect(dummyScope.name).toBe('');

        }));

        it("should have the greetMsg initialized to empty string", inject(function($controller){

            var dummyScope = {};

            $controller('greetController' , {$scope : dummyScope});

            expect(dummyScope.greetMsg).toBe('');

        }));

        it("should populate the greetMsg when greeted", inject(function($controller){

            var dummyScope = {};

            var fakeGreetService = {
                greet : function(){}
            };

            spyOn(fakeGreetService, "greet").and.returnValue("dummy greet msg");

            $controller('greetController' , {$scope : dummyScope, greetService : fakeGreetService});

            dummyScope.name = 'Magesh';
            dummyScope.greet();

            expect(fakeGreetService.greet).toHaveBeenCalledWith('Magesh');
            expect(dummyScope.greetMsg).toBe('dummy greet msg');

        }));

    })

    describe("greetService", function(){
        it("should greet 'Good Morning' before 12", inject(function(greetService){
            var _oldDate = Date;

            Date = function(){};
            Date.prototype.getHours = function(){
                return 9;
            };

            var msg = greetService.greet('Magesh');
            expect(msg).toBe('Hi Magesh, Good Morning!');

            Date = _oldDate;

        }));
    });
    describe("greetService", function(){
        it("should greet 'Good Evening' after 12", inject(function(greetService){
            var _oldDate = Date;

            Date = function(){};
            Date.prototype.getHours = function(){
                return 19;
            };

            var msg = greetService.greet('Magesh');
            expect(msg).toBe('Hi Magesh, Good Evening!');

            Date = _oldDate;

        }));
    });
});
