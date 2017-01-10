myApp.controller('AdminOrdersController', function($scope, $http, ngDialog) {
	$http.get("http://ecommerce/modules/orders/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.orders = data;
    	}
	);

	$scope.EditOrder = function(id) {
        $http.post('http://ecommerce/modules/orders/admin/controllers/details.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.order = data;

            ngDialog.open({
                template: "http://ecommerce/modules/orders/admin/views/details.html",
                scope: $scope
            });
        }).error(function(data, status) {
            $scope.msg = 'Възника грешка при изпращането на Вашата заявка';
            $scope.msg_type = 'error';
        });
    };
});