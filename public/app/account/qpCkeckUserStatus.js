angular.module('app').factory('qpCkeckUserStatus',function($http,$q,qpIdentity) {
	return {
		isLoggedIn : function(){

			var defer=$q.defer();
			$http.get('/isloggedin').then(function(response){
				if(response.data.loggedIn){
					debugger;
					qpIdentity.currentUser=response.data.user;
					defer.resolve(true);
				}else{
					defer.resolve(false);
				}
			});

			return defer.promise;
		}
	}
	
});