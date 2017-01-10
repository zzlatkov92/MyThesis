myApp.controller('AdminContactsController', function($scope, $http, ngDialog) {
	$http.get("http://ecommerce/modules/contacts/admin/controllers/index.php")
    	.success(function(data) {
        	$scope.contacts = data;
    	}
	);

	$scope.sendAnswer = function(id) {
        $http.post('http://ecommerce/modules/contacts/admin/controllers/details.php', {'id': id})
	        .success(function(data, status, headers, config) {
	            $scope.contact = data;

	            ngDialog.open({
	                template: "http://ecommerce/modules/contacts/admin/views/details.html",
	                scope: $scope
	            });
	        });
    };
});