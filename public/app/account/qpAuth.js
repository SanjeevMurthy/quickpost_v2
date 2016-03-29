angular.module('app').factory('qpAuth',function($http,qpIdentity,$q,qpUserService){
	return {

		authenticateUser:function(username,password){
			var defferedPromise=$q.defer();
			var userCredential={
				username:username,
				password:password
			};

			$http.post('/login',userCredential).then(function(response){
				if(response.data.success){
					debugger;
					var user=new qpUserService();
					angular.extend(user,response.data.user);				
					qpIdentity.currentUser=user;
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