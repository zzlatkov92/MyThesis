myApp.controller('UserReviewsController', function($scope, $http) {
	$http.get("http://ecommerce/modules/users/controllers/reviews.php")
    	.success(function(data) {
        	$scope.reviews = data;
    	}
	);
});