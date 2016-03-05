angular.module('app').controller('qpNavbarLoginCtrl',function ($scope,$http,$cookieStore,qpNotifier,qpIdentity,qpAuth,$location) {
	$scope.identity=qpIdentity;

	$scope.signin=function(username,password){
		qpAuth.authenticateUser(username,password).then(function(success){
			if(success){
				$cookieStore.put('loggedin', 'true');
				qpNotifier.notify("You have successfully signed in ! ");
			}else{
				qpNotifier.notify("username/password combination incorrect !!");
			}
		});		
	}

	$scope.signout=function(){
		qpAuth.logoutUser().then(function(){
			$scope.username="";
			$scope.password="";
			$cookieStore.put('loggedin',"");
			qpNotifier.notify("You have successfully signed out !");
			$location.path('/');
		});
	}
});