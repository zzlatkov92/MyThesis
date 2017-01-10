var myApp = angular.module('myApp', ['ngRoute','ngResource','ngDialog','rzModule','passwordCheck','textAngular','ngFileUpload','ngQuickDate', 'ngCart', 'infinite-scroll'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/modules/home/views/index.html',
			controller: 'HomepageController'
		})
		.when('/orders', {
			templateUrl: '/modules/orders/views/index.html',
			controller: 'OrdersController'
		})
		.when('/categories', {
			templateUrl: '/modules/categories/views/index.html',
			controller: 'CategoriesController'
		})
		.when('/pages/:link', {
			templateUrl: '/modules/pages/views/index.html',
			controller: 'PagesController'
		})
		.when('/products/:link', {
			templateUrl: '/modules/products/views/index.html',
			controller: 'ProductsController'
		})
		.when('/products/details/:link', {
			templateUrl: '/modules/products/views/details.html',
			controller: 'ProductsDetailsController'
		})
		.when('/products/search/:link', {
			templateUrl: '/modules/products/views/search.html',
			controller: 'ProductsSearchResultController'
		})
		.when('/admin', {
			templateUrl: '/modules/admin/views/index.html',
			controller: 'AdminController'
		})
		.when('/admin/home', {
			templateUrl: '/modules/admin/views/home.html',
			controller: 'AdminHomeController'
		})
		.when('/admin/pages', {
			templateUrl: '/modules/pages/admin/views/index.html',
			controller: 'AdminPagesController'
		})
		.when('/admin/orders', {
			templateUrl: '/modules/orders/admin/views/index.html',
			controller: 'AdminOrdersController'
		})
		.when('/admin/users', {
			templateUrl: '/modules/users/admin/views/index.html',
			controller: 'AdminUsersController'
		})
		.when('/admin/products', {
			templateUrl: '/modules/products/admin/views/index.html',
			controller: 'AdminProductsController'
		})
		.when('/admin/products/comments', {
			templateUrl: '/modules/products/admin/views/comments.html',
			controller: 'AdminProductsCommentsController'
		})
		.when('/admin/categories', {
			templateUrl: '/modules/categories/admin/views/index.html',
			controller: 'AdminCategoriesController'
		})
		.when('/admin/producers', {
			templateUrl: '/modules/producers/admin/views/index.html',
			controller: 'AdminProducersController'
		})
		.when('/admin/contacts', {
			templateUrl: '/modules/contacts/admin/views/index.html',
			controller: 'AdminContactsController'
		})
		.when('/admin/promotions', {
			templateUrl: '/modules/promotions/admin/views/index.html',
			controller: 'AdminPromotionsController'
		})
		.otherwise({
        	redirectTo: '/'
      	});

		$locationProvider.html5Mode(true);
	});


myApp.run(function($rootScope, $location, loginService, $http, ngDialog) {
	var routepermissions = ['/orders'],
		routepermissions_admin = /admin\/[^\s]/g,
		regex = new RegExp(routepermissions_admin);

	$rootScope.$on('$routeChangeStart', function() {
		hideSearch();

		var opened_popups = ngDialog.getOpenDialogs();

		for(var i = 0; i < opened_popups.length; i++) {
    		var current_popup = document.getElementById(opened_popups[i]);

    		if(current_popup) {
    			current_popup.remove();
    		}
    	}

		if(routepermissions.indexOf($location.path()) != -1) {
			var connected = loginService.islogged();

			connected.then(function(msg) {
				if(!msg.data) {
					$location.path('/');
				}
			});
		}

		if($location.path().match(regex)) {
			var connected = $http.post('http://ecommerce/modules/admin/controllers/check_admin_session.php');

			connected.then(function(msg) {
				if(!msg.data) {
					$location.path('/admin');
				}
			});

			$('.main_header, .do-search-to-be-shown, .main_footer').hide();
			$('#main_holder').css({
				'padding-bottom': 0
			});
		}

		if($location.path() == '/admin') {
			var connected = $http.post('http://ecommerce/modules/admin/controllers/check_admin_session.php');
			
			connected.then(function(msg) {
				if(msg.data) {
					$location.path('/admin/home');
				}
			});
		}
	});
});

myApp.config(function (ngDialogProvider) {
    ngDialogProvider.setForceHtmlReload(true);
});

function reloadPage() {
	window.location.reload();
}

$(window).load(function() {
	setTimeout(function() {
		$(".do-pre-loader").fadeOut("slow");
	},200);
});