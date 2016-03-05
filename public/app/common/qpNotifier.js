angular.module('app').value('qpToastr',toastr);

angular.module('app').factory('qpNotifier',function(qpToastr) {
	return {
		notify : function(message){
			qpToastr.success(message);
			console.log(message);
		}
	}
})