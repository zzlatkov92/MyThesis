myApp.controller('UserSigninController', function($scope, loginService) {
	$scope.msg = '';
    $scope.login = function(user) {
        loginService.login(user,$scope);
    }
});