myApp.controller('AdminContactsDetailsController', function($scope, $http, ngDialog, popupService) {
	$scope.sendAnswer = function(contact) {
        $('button[type="submit"]').addClass('button--loading');

		$http.post('http://ecommerce/modules/contacts/admin/controllers/send.php', contact)
            .success(function(data, status, headers, config) {
                $scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно отговорихте на запитването'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');

                popupService.init('http://ecommerce/partials/alert.html', $scope, reloadPage);
            });
	};
});