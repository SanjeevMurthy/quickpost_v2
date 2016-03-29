angular.module('app').factory('qpCkeckUserStatus',function($http,$q,qpIdentity,qpUserService) {
	return {
		isLoggedIn : function(){

			var defer=$q.defer();
			$http.get('/isloggedin').then(function(response){
				if(response.data.loggedIn){
					debugger;
					var currentuser=new qpUserService();
					angular.extend(currentuser,response.data.user);
					qpIdentity.currentUser=currentuser;
					defer.resolve(true);
				}else{
					defer.resolve(false);
				}
			});

			return defer.promise;
		}
	}
	
});