myApp.controller('ProductsDetailsController', function($scope, $http, $routeParams, loginService, $sce, ngDialog, popupService) {
	$scope.totalComments = 0;

	if(JSON.parse(localStorage.getItem("visited_products"))) {
		var visited_products = JSON.parse(localStorage.getItem("visited_products"));
	} else {
		var visited_products = [];
	}
	

	localStorage.setItem("visited_products", JSON.stringify(visited_products));

	visited_products = JSON.parse(localStorage.getItem("visited_products"));

	visited_products.push($routeParams.link);

	localStorage.setItem("visited_products", JSON.stringify(visited_products));
	
	$http.post("http://ecommerce/modules/products/controllers/details.php", {'link': $routeParams.link})
		.success(function(data) {
	    	$scope.product = data;

	    	setTimeout(function() {
	    		gallery();
	    	},300);

	    	$scope.ProductOverview = $sce.trustAsHtml($scope.product.ProductOverview);
	    	$scope.ProductFeatures = $sce.trustAsHtml($scope.product.ProductFeatures);

	    	if($scope.product.Comments) {
	    		var comments = $scope.product.Comments;

	    		$scope.totalComments = comments.length;
	    	}
		}
	);

	$scope.userIsLogged = false;
	$scope.connected = loginService.islogged();

	$scope.connected.then(function(msg) {
		if(msg.data) {
			$scope.userIsLogged = true;
		}
	});

 	$scope.msg = '';
	$scope.msg_type = 'error';

	$scope.addComment = function(id, ctx, name, lastname) {
		$('button[type="submit"]').addClass('button--loading');

		var data = {
			'id': id,
			'ctx': ctx,
			'name': name,
			'lastname': lastname
		};

		$http.post('http://ecommerce/modules/products/controllers/add_comment.php', data)
	        .success(function(data, status, headers, config) {
	        	$scope.product.commentCtx = null;
	        	$scope.product.commentUserName = null;
	        	$scope.product.commentUserLastName = null;

	        	$scope.alert = {
                    'title': 'Успех',
                    'message': 'Успешно добавихте коментар'
                };

                $scope.closePopup = function() {
                    ngDialog.close();
                }

                $('button[type="submit"]').removeClass('button--loading');

                popupService.init('http://ecommerce/partials/alert.html', $scope, reloadPage);
	            
	        });
	};

	$scope.favorite_msg = '';


	$scope.favoriteProduct = function(id) {
		var data = {
			'id': id
		};

		$http.post('http://ecommerce/modules/products/controllers/add_favorite.php', data)
	        .success(function(data, status, headers, config) {
	        	if(data == 'added') {
					$scope.favorite_msg = 'Продуктът е вече добавен в любими';
		            $scope.favorite_msg_type = 'error';
	        	} else {
	        		$scope.alert = {
	                    'title': 'Успех',
	                    'message': 'Успешно добавихте продукта в любими'
	                };

	                $scope.closePopup = function() {
	                    ngDialog.close();
	                }

	                popupService.init('http://ecommerce/partials/alert.html', $scope);
	        	}
	            
	        });
	};
});