myApp.controller('HomepageController', function HomepageController($scope, $http) {
	$http.get("http://ecommerce/modules/home/controllers/index.php")
    	.success(function(data) {
        	$scope.promotions = data;

        	setTimeout(function() {
	    		gallery();
	    	},300);
    	}
	);

	$http.get("http://ecommerce/modules/home/controllers/products.php")
    	.success(function(data) {
        	$scope.products = data;

        	setTimeout(function() {
	    		multipleGallery();
	    	},300);
    	}
	);
});