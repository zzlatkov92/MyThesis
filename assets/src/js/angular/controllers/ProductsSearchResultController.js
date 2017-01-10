myApp.controller('ProductsSearchResultController', function($scope, $http, $routeParams) {
	$http.post("http://ecommerce/modules/products/controllers/livesearch.php", {'key': $routeParams.link})
		.success(function(data) {
	    	$scope.products = data;
		}
	);
});