myApp.controller('AdminUsersController', function($scope, $http) {
	$http.get("http://ecommerce/modules/users/admin/controllers/users.php")
    	.success(function(data) {
        	$scope.users = data;
    	}
	);
});