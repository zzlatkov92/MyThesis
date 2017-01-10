myApp.controller('AdminPagesDetailsController', function($scope, $http, ngDialog, popupService) {
	$scope.savePage = function(page) {
        $('button[type="submit"]').addClass('button--loading');

		$http.post('http://ecommerce/modules/pages/admin/controllers/save.php', page)
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
	}
});