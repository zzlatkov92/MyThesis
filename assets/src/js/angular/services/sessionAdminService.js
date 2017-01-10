myApp.factory('sessionAdminService', function($http) {
	return {
		set: function(key, value) {
			return sessionStorage.setItem(key,value);
		},
		get: function(key) {
			return sessionStorage.getItem(key);
		},
		destroy: function(key) {
			$http.post('http://ecommerce/modules/admin/controllers/destroy_admin_session.php');
			return sessionStorage.removeItem(key);
		}
	}
});