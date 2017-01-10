myApp.controller('OrdersController', function($scope, $http, ngDialog) {
	$http.get("http://ecommerce/modules/orders/controllers/list.php")
    	.success(function(data) {
        	$scope.orders = data;
    	}
	);

    $scope.orderDetails = function(id) {
    	$http.post('http://ecommerce/modules/orders/controllers/details.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.order = data;

            ngDialog.open({
                template: "http://ecommerce/modules/orders/views/details.html",
                scope: $scope
            });
        });
    };
});