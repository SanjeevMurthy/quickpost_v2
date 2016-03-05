angular.module('app').factory('qpAuth',function($http,qpIdentity,$q){
	return {

		authenticateUser:function(username,password){
			var defferedPromise=$q.defer();
			var user={
				username:username,
				password:password
			};

			$http.post('/login',user).then(function(response){
				if(response.data.success){	
					debugger;				
					qpIdentity.currentUser=response.data.user;
					defferedPromise.resolve(true);					
				}else{
					debugger;
					defferedPromise.resolve(false);
				}
			});
			return defferedPromise.promise;
		},
		logoutUser:function(){
			var defferedPromise=$q.defer();
			$http.post('/logout',{logout:true}).then(function(){
				qpIdentity.currentUser=undefined;
				defferedPromise.resolve(true);
			});

			return defferedPromise.promise;
		}
	}
})