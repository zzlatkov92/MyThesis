myApp.controller('AdminProducersDetailsController', function ($scope, $http, ngDialog, popupService) {
	$scope.saveProducer = function(producer) {
        $('button[type="submit"]').addClass('button--loading');

		$http.post('http://ecommerce/modules/producers/admin/controllers/save.php', producer)
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