angular.module('app').controller('qpMainCtrl', function($scope,qpCkeckUserStatus) {
    $scope.myVar = "Hello Angular";

    qpCkeckUserStatus.isLoggedIn().then(function(response){
    	if(response){
    		console.log("User session alive !");
    	}else{
    		console.log("No user session found !!");
    	}
    	
    });
});