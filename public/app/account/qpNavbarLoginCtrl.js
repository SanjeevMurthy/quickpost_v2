angular.module('app').controller('qpNavbarLoginCtrl',function ($scope,$http,$cookieStore,qpNotifier,qpIdentity,qpAuth,$location) {
	$scope.identity=qpIdentity;

	$scope.signin=function(username,password){
		qpAuth.authenticateUser(username,password).then(function(success){
			if(success){
				$cookieStore.put('loggedin', 'true');
				document.getElementById("bars").setAttribute("class", "navbar-toggle collapsed");
				document.getElementById("bars").setAttribute("aria-expanded", "false");

				document.getElementById("navbar-collapse-1").setAttribute("class", "navbar-collapse collapse");
				document.getElementById("navbar-collapse-1").setAttribute("aria-expanded", "false");


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
			document.getElementById("bars").setAttribute("class", "navbar-toggle collapsed");
			document.getElementById("bars").setAttribute("aria-expanded", "false");

			document.getElementById("navbar-collapse-1").setAttribute("class", "navbar-collapse collapse");
			document.getElementById("navbar-collapse-1").setAttribute("aria-expanded", "false");

			qpNotifier.notify("You have successfully signed out !");
			$location.path('/');
		});
	}
});