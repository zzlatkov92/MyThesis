myApp.controller('PagesController', function($scope, $http, $routeParams, $sce) {
	$http.post("http://ecommerce/modules/pages/controllers/index.php", {'link': $routeParams.link})
    	.success(function(data) {
        	$scope.page = data;

            $scope.pageHtml = $sce.trustAsHtml($scope.page.PageContent);
    	}
	);
});