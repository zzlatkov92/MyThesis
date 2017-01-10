myApp.controller('AdminPagesController', function($scope, $http, ngDialog, popupService) {
	$http.get("http://ecommerce/modules/pages/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.pages = data;
    	}
	);

    $scope.AddPage = function() {
    	ngDialog.open({
			template: "http://ecommerce/modules/pages/admin/views/details.html"
		});
    };

    $scope.EditPage = function(id) {
        $http.post('http://ecommerce/modules/pages/admin/controllers/details.php', {'id': id})
        .success(function(data, status, headers, config) {
            $scope.page = data;

            ngDialog.open({
                template: "http://ecommerce/modules/pages/admin/views/details.html",
                scope: $scope
            });
        }).error(function(data, status) {
            $scope.msg = 'Възника грешка при изпращането на Вашата заявка';
            $scope.msg_type = 'error';
        });
    };

    $scope.DeletePage = function(id) {
        $http.post('http://ecommerce/modules/pages/admin/controllers/delete.php', {'id': id})
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