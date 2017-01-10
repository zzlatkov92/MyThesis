myApp.factory('loginAdminService', function($http, $location, sessionAdminService, $route) {
	return {
		login: function(user,scope) {
			$('button[type="submit"]').addClass('button--loading');

			var $promise = $http.post('http://ecommerce/modules/admin/controllers/signin_admin.php', user);
			$promise.then(function(msg) {
				var adminid = msg.data;
				if(adminid) {
					sessionAdminService.set('adminid',adminid);
					reloadPage();
				} else {
					scope.msg = 'Въведенят и-мейл и парола не съвпадат';
				}

				$('button[type="submit"]').removeClass('button--loading');
			});
		},
		logout: function() {
			sessionAdminService.destroy('adminid');
			reloadPage();
		},
		islogged: function() {
			var $checkSessionServer = $http.post('http://ecommerce/modules/admin/controllers/check_admin_session.php');
			return $checkSessionServer;
		}
	}
});