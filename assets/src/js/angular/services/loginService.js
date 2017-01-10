myApp.factory('loginService', function($http, $location, sessionService, $route) {
	return {
		login: function(user,scope) {
			$('button[type="submit"]').addClass('button--loading');

			var $promise = $http.post('http://ecommerce/modules/users/controllers/signin.php', user);
			$promise.then(function(msg) {
				var uid = msg.data;
				if(uid) {
					sessionService.set('uid',uid);
					reloadPage();
				} else {
					scope.msg = 'Въведенят и-мейл и парола не съвпадат';
				}

				$('button[type="submit"]').removeClass('button--loading');
			});
		},
		logout: function() {
			sessionService.destroy('uid');
			reloadPage();
		},
		islogged: function() {
			var $checkSessionServer = $http.post('http://ecommerce/modules/users/controllers/check_session.php');
			return $checkSessionServer;
		}
	}
});