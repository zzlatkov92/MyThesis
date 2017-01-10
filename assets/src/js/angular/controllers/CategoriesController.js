myApp.controller('CategoriesController', function($scope, $http) {
	$http.get("http://ecommerce/modules/categories/controllers/index.php")
    	.success(function(data) {
        	$scope.categories = data;
    	}
	);
});