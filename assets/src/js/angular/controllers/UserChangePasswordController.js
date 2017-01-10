myApp.controller('UserChangePasswordController', function($scope, $http, ngDialog, popupService) {
    $scope.ChangePassword = function(user) {
        $('button[type="submit"]').addClass('button--loading');

        $http.post('http://ecommerce/modules/users/controllers/change_password.php', user)
            .success(function(data, status, headers, config) {
                $scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно сменихте Вашите данни'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');

                popupService.init('http://ecommerce/partials/alert.html', $scope);
            });
    }
});