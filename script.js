var app = angular.module("eventApp",[]);

app.controller("parentController",function($scope){
    $scope.name="Parent";
    $scope.parentMessage = "";
    $scope.parentArea = "";

    // parent listens to son
    $scope.$on('SON_TO_PARENT',function(e,msg){
        $scope.WriteMessage("Son",msg);
    });

    // parent listens to daughter
    $scope.$on('DAUGHTER_TO_PARENT',function(e,msg){
        $scope.WriteMessage("Daughter",msg);
    });

    $scope.$on('DAUGHTER_TO_FAMILY',function(e,msg){
        $scope.WriteMessage("Daughter",msg);
    });

    // parent broadcast a msg to all child
    $scope.talkToAll = function(){
        $scope.WriteMessage("Me",$scope.parentMessage);
        $scope.$broadcast('PARENT_TO_ALL',$scope.parentMessage);
    };
    
    // parent communicate with son
    $scope.talkToSon = function(){
        $scope.WriteMessage("Me",$scope.parentMessage);
        $scope.$broadcast('PARENT_TO_SON',$scope.parentMessage);
    };

    // parent communicate with daughter
    $scope.talkToDaughter = function(){
        $scope.WriteMessage("Me",$scope.parentMessage);
        $scope.$broadcast('PARENT_TO_DAUGHTER',$scope.parentMessage);
    };

    $scope.WriteMessage = function(who,msg){
        var message = who+":- "+msg;
        $scope.parentArea += message + "\n";
    };
});

app.controller("sonController",function($scope,$rootScope){
    $scope.name = "Son";
    $scope.sonArea = "";
    $scope.sonMessage = "";

    // son listent to parent
    $scope.$on('PARENT_TO_SON',function(e,msg){
        $scope.WriteMessage("Daddy",msg);
    });

    $scope.$on('PARENT_TO_ALL',function(e,msg){
        $scope.WriteMessage("Daddy",msg);
    });

    $scope.$on('DAUGHTER_TO_FAMILY', function(E, msg) {
        $scope.WriteMessage("Sister",msg);
    });

    // son listens to sister
    $rootScope.$on('DAUGHTER_TO_BROTHER',function(e,msg){
        $scope.WriteMessage("Sister",msg);
    });

    // son send event to parent
    $scope.talkToParent = function(){
        $scope.WriteMessage("Me",$scope.sonMessage);
        $scope.$emit('SON_TO_PARENT',$scope.sonMessage);
    };

    // son communicate to sister
    $scope.talkToSister = function(){
        $scope.WriteMessage("Me",$scope.sonMessage);
        $rootScope.$emit('SON_TO_SISTER',$scope.sonMessage);
    };

    $scope.WriteMessage = function(who,msg){
        var message = who + ":- "+msg;
        $scope.sonArea += message + "\n";
    };
});

app.controller("daughterController",function($scope,$rootScope){
    $scope.name = "Daughter";
    $scope.daughterArea = "";
    $scope.daughterMessage = "";

    // daughter listens to parent
    $scope.$on('PARENT_TO_DAUGHTER',function(e,msg){
        $scope.WriteMessage("Daddy",msg);
    });

    $scope.$on('PARENT_TO_ALL',function(e,msg){
        $scope.WriteMessage("Daddy",msg);
    });

    // sister listens to brother
    $rootScope.$on('SON_TO_SISTER',function(e,msg){
        $scope.WriteMessage("Brother",msg);
    });

    // daughter send event to parent
    $scope.talkToParent = function(){
        $scope.WriteMessage("Me",$scope.daughterMessage);
        $scope.$emit('DAUGHTER_TO_PARENT',$scope.daughterMessage);
    };


    // daughter communicate to brother
    $scope.talkToBrother = function(){
        $scope.WriteMessage("Me",$scope.daughterMessage);
        $scope.$emit('DAUGHTER_TO_BROTHER',$scope.daughterMessage);
    };

    $scope.talkToFamily = function(){
        $scope.WriteMessage("Me",$scope.daughterMessage);
        $scope.$parent.$broadcast('DAUGHTER_TO_FAMILY', $scope.daughterMessage);
    };

    $scope.WriteMessage = function(who,msg){
        var message = who + ":- "+msg;
        $scope.daughterArea += message + "\n";
    };
});
