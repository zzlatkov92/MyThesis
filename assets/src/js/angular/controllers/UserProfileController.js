myApp.controller('UserProfileController', function($scope, $http, popupService, ngDialog) {
	$http.get("http://ecommerce/modules/users/controllers/profile.php")
    	.success(function(data) {
        	$scope.profile = data;
    	}
	);

    $scope.saveProfile = function(profile) {
        $('button[type="submit"]').addClass('button--loading');

    	$http.post('http://ecommerce/modules/users/controllers/profile_edit.php', profile)
            .success(function(data, status, headers, config) {
                $scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно сменихте Вашите данни'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');

                popupService.init('http://ecommerce/partials/alert.html', $scope)
            });
    };
});