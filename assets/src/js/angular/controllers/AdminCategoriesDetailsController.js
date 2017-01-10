myApp.controller('AdminCategoriesDetailsController', function($scope, $http, ngDialog, popupService) {
	$scope.saveCategory = function(category) {
        $('button[type="submit"]').addClass('button--loading');

		$http.post('http://ecommerce/modules/categories/admin/controllers/save.php', category)
            .success(function(data, status, headers, config) {
                $scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно сменихте Вашите данни'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');

                popupService.init('http://ecommerce/partials/alert.html', $scope, reloadPage);
            });
	};
});