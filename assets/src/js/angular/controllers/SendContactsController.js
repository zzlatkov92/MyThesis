myApp.controller('SendContactsController', function($scope, $http, ngDialog, popupService) {
	$scope.sendContact = function(contact) {
        $('button[type="submit"]').addClass('button--loading');

		$http.post('http://ecommerce/modules/contacts/controllers/index.php', contact)
            .success(function(data, status, headers, config) {
                $scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно изпратихте запитване'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');

                popupService.init('http://ecommerce/partials/alert.html', $scope);
            });
	};
});