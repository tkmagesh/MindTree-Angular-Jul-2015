angular
    .module("greet", [])
    .service("greetService", function(){
        this.greet = function(name){
            var currentTime = new Date();
            if (currentTime.getHours() < 12){
                return 'Hi ' + name + ', Good Morning!';
            } else {
                return 'Hi ' + name + ', Good Evening!';
            }
        }
    })
    .controller("greetController", function($scope, greetService){
        $scope.name = '';
        $scope.greetMsg = '';
        $scope.greet = function(){
            $scope.greetMsg = greetService.greet($scope.name);
        }
    });
