myApp.controller('AdminOrdersDetailsController', function($scope, $http, ngDialog, popupService) {
	$scope.changeOrderStatus = function(id, status) {
        $('button[type="submit"]').addClass('button--loading');

		var data = {
			'id': id,
			'status': status
		};

		$http.post('http://ecommerce/modules/orders/admin/controllers/change.php', data)
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