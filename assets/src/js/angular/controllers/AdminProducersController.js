myApp.controller('AdminProducersController', function($scope, $http, ngDialog, popupService) {
	$http.get("http://ecommerce/modules/producers/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.producers = data;
    	}
	);

    $scope.AddProducer = function() {
    	ngDialog.open({
			template: "http://ecommerce/modules/producers/admin/views/details.html"
		});
    };

    $scope.EditProducer = function(id) {
        $http.post('http://ecommerce/modules/producers/admin/controllers/details.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.Producer = data;

            ngDialog.open({
                template: "http://ecommerce/modules/producers/admin/views/details.html",
                scope: $scope
            });
        }).error(function(data, status) {
            $scope.msg = 'Възника грешка при изпращането на Вашата заявка';
            $scope.msg_type = 'error';
        });
    };

    $scope.DeleteProducer = function(id) {
        $http.post('http://ecommerce/modules/producers/admin/controllers/delete.php', {'id': id})
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