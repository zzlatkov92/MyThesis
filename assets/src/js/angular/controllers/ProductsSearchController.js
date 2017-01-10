myApp.controller('ProductsSearchController', function($scope, $http) {
	$scope.noResults = false;

	$('body').on('keyup','.do-live-search', function() {
		var searchKey = $(this).val();

		$http.post("http://ecommerce/modules/products/controllers/livesearch.php", {'key': searchKey})
			.success(function(data) {
		    	$scope.productsFound = data;
			}
		);

		if(searchKey.length > 3) {
			$scope.noResults = true;
		} else {
			$scope.noResults = false;
		}
	});
});