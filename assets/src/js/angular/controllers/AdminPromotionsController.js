myApp.controller('AdminPromotionsController', function($scope, $http, ngDialog, popupService) {
	$http.get("http://ecommerce/modules/promotions/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.promotions = data;
    	}
	);

    $scope.AddPromotion = function() {
    	ngDialog.open({
			template: "http://ecommerce/modules/promotions/admin/views/details.html"
		});
    };

    $scope.EditPromotion = function(id) {
        $http.post('http://ecommerce/modules/promotions/admin/controllers/details.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.promotion = data;

            ngDialog.open({
                template: "http://ecommerce/modules/promotions/admin/views/details.html",
                scope: $scope
            });
        }).error(function(data, status) {
            $scope.msg = 'Възника грешка при изпращането на Вашата заявка';
            $scope.msg_type = 'error';
        });
    };

    $scope.DeletePromotion = function(id) {
        $http.post('http://ecommerce/modules/promotions/admin/controllers/delete.php', {'id': id})
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