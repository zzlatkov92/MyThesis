myApp.controller('AdminCategoriesController', function($scope, $http, ngDialog, popupService) {
	$http.get("http://ecommerce/modules/categories/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.categories = data;
    	}
	);

    $scope.AddCategory = function() {
    	ngDialog.open({
			template: "http://ecommerce/modules/categories/admin/views/details.html"
		});
    };

    $scope.EditCategory = function(id) {
        $http.post('http://ecommerce/modules/categories/admin/controllers/details.php', {'id': id})
            .success(function(data, status, headers, config) {
                $scope.category = data;

                ngDialog.open({
                    template: "http://ecommerce/modules/categories/admin/views/details.html",
                    scope: $scope
                });
            }).error(function(data, status) {
                $scope.msg = 'Възника грешка при изпращането на Вашата заявка';
                $scope.msg_type = 'error';
            });
    };

    $scope.DeleteCategory = function(id) {
        $http.post('http://ecommerce/modules/categories/admin/controllers/delete.php', {'id': id})
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
});