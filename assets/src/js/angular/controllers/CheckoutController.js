myApp.controller('CheckoutController', function($scope, $http, loginService, ngCart, ngDialog, $rootScope, popupService) {
	$scope.userIsLogged = false;
	$scope.connected = loginService.islogged();

	$scope.connected.then(function(msg) {
		if(msg.data) {
			$scope.userIsLogged = true;
		}
	});

	ngCart.setTaxRate(20);
    ngCart.setShipping(10);

    $scope.closePopup = function() {
        ngDialog.close();
    }

    $scope.checkoutComplete = function(message) {
    	$('button[type="submit"]').addClass('button--loading');

        if(message == 'success') {
            message = 'Успешно извършихте поръчка';
        }

		$scope.alert = {
            'title': 'Успех',
            'message': message
        };

        $('button[type="submit"]').removeClass('button--loading');

        function emptyBasket() {
            ngCart.empty();
        }

        popupService.init('http://ecommerce/partials/alert.html', $scope, emptyBasket());
    };
});