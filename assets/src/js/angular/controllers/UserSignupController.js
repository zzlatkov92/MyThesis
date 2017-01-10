myApp.controller('UserSignupController', function($scope, $http, ngDialog, popupService) {
	$scope.errors = [];

    $scope.SignUp = function(register) {
        $('button[type="submit"]').addClass('button--loading');

        $scope.errors.splice(0, $scope.errors.length);

        $http.post('http://ecommerce/modules/users/controllers/signup.php', register)
            .success(function(data, status, headers, config) {
                if (data.msg == '') {
                    $scope.errors.push(data.error);
                } else {
                    popupService.init('http://ecommerce/partials/alert.html', $scope);
                }

                $scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно създадохте регистрация'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');
            });
    }
});