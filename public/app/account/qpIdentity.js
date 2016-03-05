angular.module('app').factory('qpIdentity',function($cookieStore) {
	
	function checkLoginStatus(){
		var loggedIn = $cookieStore.get('loggedin');
		if(loggedIn){
			return true;
		}else{
			return false;
		}
	}
	
	return {
		currentUser : undefined,
		isLoggedIn:checkLoginStatus,
		isAuthenticated:function(){
			return !!this.currentUser;
		}
	}
});