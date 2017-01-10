myApp.controller('AdminController', function($scope, loginAdminService) {
	$scope.msg = '';
    $scope.login = function(user) {
        loginAdminService.login(user,$scope);
    }
});