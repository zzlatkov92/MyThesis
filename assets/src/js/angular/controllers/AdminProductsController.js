myApp.controller('AdminProductsController', function($scope, $http, ngDialog, popupService) {
	$http.get("http://ecommerce/modules/products/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.products = data;
    	}
	);

	$scope.AddProduct = function() {
    	ngDialog.open({
			template: "http://ecommerce/modules/products/admin/views/details.html"
		});
    };

    $scope.EditProduct = function(id) {
        $http.post('http://ecommerce/modules/products/admin/controllers/details.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.product = data;

            ngDialog.open({
                template: "http://ecommerce/modules/products/admin/views/details.html",
                scope: $scope
            });
        }).error(function(data, status) {
            $scope.msg = 'Възника грешка при изпращането на Вашата заявка';
            $scope.msg_type = 'error';
        });
    };

    $scope.DeleteProduct = function(id) {
        $http.post('http://ecommerce/modules/products/admin/controllers/delete.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.alert = {
                'title': 'Успех',
                'message': 'Успешно изтрихте записа'
            };

            $scope.closePopup = function() {
                ngDialog.close();
            }

            popupService.init('http://ecommerce/partials/alert.html', $scope, reloadPage);
        }).error(function(data, status) {
            console.log('Възника грешка при изпращането на Вашата заявка');
        });
    };

    $http.get("http://ecommerce/modules/categories/admin/controllers/index.php")
        .success(function(data) {
            $scope.categories = data;
        }
    );

    $http.get("http://ecommerce/modules/producers/admin/controllers/index.php")
        .success(function(data) {
            $scope.producers = data;
        }
    );
});