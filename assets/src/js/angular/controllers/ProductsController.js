myApp.controller('ProductsController', function($scope, $http, $routeParams, ngDialog) {
	if(JSON.parse(localStorage.getItem("visited_products"))) {
		var visited_products = JSON.parse(localStorage.getItem("visited_products"));
	} else {
		var visited_products = [];
	}

    var unique_visited_products = visited_products.filter(function(item, pos) {
        return visited_products.indexOf(item) == pos;
    });

    var visited_data = {
        'visited_products': unique_visited_products
    };

    $scope.visited_products = unique_visited_products;

    $scope.history = function() {
        $http.post("http://ecommerce/modules/products/controllers/visited_products.php", visited_data)
	        .success(function(data) {
	            $scope.products = data;

	            ngDialog.open({
	                template: "http://ecommerce/modules/products/views/visited_products.html",
	                scope: $scope
	            });
	        }).error(function(data, status) {
	            console.log('Възника грешка при изпращането на Вашата заявка');
	        });
    };

    $http.post("http://ecommerce/modules/products/controllers/index.php", {'link': $routeParams.link})
		.success(function(data) {
			$scope.filter = {};

		    $scope.filterByProperties = function(product) {
		        var matchesAND = true;

		        for (var prop in $scope.filter) {

		            if (noSubFilter($scope.filter[prop])) continue;
		            if (!$scope.filter[prop][product[prop]]) {
		                matchesAND = false;
		                break;
		            }
		        }

		        if(!$scope.priceFilter) {
		        	matchesAND = false;
		        }

		        return matchesAND;
		    };
		    
		    function noSubFilter(subFilterObj) {
		        for (var key in subFilterObj) {
		            if (subFilterObj[key]) return false;
		        }

		        return true;
		    }



	    	$scope.products = data;

    		var producers = [];

    		for (var i = 0; i  < $scope.products.length; i++) {
	    		producers.push($scope.products[i]['ProducerId']);
	    	}

	    	$scope.unique_producers = producers.filter(function(item, pos) {
			    return producers.indexOf(item) == pos;
			});

	    	$http.post("http://ecommerce/modules/products/controllers/producers.php", {'producers': $scope.unique_producers})
				.success(function(data) {
			    	$scope.producers = data;
				}
			);

	    	var statuses = [];

	    	for (var j = 0; j  < $scope.products.length; j++) {
	    		statuses.push($scope.products[j]['ProductStatus']);
	    	}

	    	$scope.statuses = statuses.filter(function(item, pos) {
			    return statuses.indexOf(item) == pos;
			});

	    	var prices = [];

	    	for (var i = 0; i  < $scope.products.length; i++) {
	    		prices.push($scope.products[i]['ProductPrice']);
	    	}

    		$scope.max = parseInt(Math.max.apply(null, prices));

	    	$scope.priceFilter = function(prop) {
	    		return function predicateFunc(item) {
					return 0 <= item[prop] && item[prop] <= $scope.max;
		        };
	    	}

	    	$scope.options = {
	    		onChange: function(e,min,max) {
	    			for(var i = 0; i < prices.length; i++) {
	    				$scope.priceFilter = function(prop) {
	    					return function predicateFunc(item) {
	    						return min <= item[prop] && item[prop] <= max;
					        };
	    				}
	    			}
	    		}
	    	}
		}
	);


	$scope.loadMore = function() {
		$http.post("http://ecommerce/modules/products/controllers/index.php", {'link': $routeParams.link})
			.success(function(data) {
				$scope.products = data;
			}
		);
	};
});