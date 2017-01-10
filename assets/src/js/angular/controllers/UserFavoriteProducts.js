myApp.controller('UserFavoriteProducts', function($scope, $http) {
	var favorite_products = function() {
		$http.get("http://ecommerce/modules/users/controllers/favorite_products.php")
	    	.success(function(data) {
	        	$scope.favproducts = data;
	    	}
		);
    };

    favorite_products();

	$scope.removeFavorite = function(id) {
        $http.post('http://ecommerce/modules/users/controllers/remove_favorite.php', {'id': id})
	        .success(function(data, status, headers, config) {
	            favorite_products();
	        });
    };
});