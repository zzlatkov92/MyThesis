myApp.controller('UserForgotPassword', function($scope, $http, ngDialog, popupService) {
    $scope.msg = '';

    popupService.close();

    $scope.ForgotPassword = function(user) {
        $('button[type="submit"]').addClass('button--loading');

        $http.post('http://ecommerce/modules/users/controllers/forgot_password.php', user)
            .success(function(data, status, headers, config) {
                if (data == 'success') {
                    $scope.alert = {
                        'title': 'Успех',
                        'message': 'Успешно сменихте Вашите данни'
                    };

                    $scope.closePopup = function() {
                        ngDialog.close();
                    }

                    $('button[type="submit"]').removeClass('button--loading');

                    popupService.init('http://ecommerce/partials/alert.html', $scope);
                }
                else {
                    $scope.msg = 'Въведеният от Вас и-мейл не съществува';
                    $scope.msg_type = 'error';
                }
            });
    }
});