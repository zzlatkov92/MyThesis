myApp.controller('AppController',function AppController($scope, ngDialog, loginService, $http, popupService, loginAdminService) {
	var header = document.getElementById('main_header');

	if(header) {
		setTimeout(function() {
			var holder = document.getElementById('main_holder');

			holder.style.paddingTop = header.clientHeight + 'px';
		},250);
	}

	var isIOS = /iphone|ipad/gi.test(navigator.appVersion),
		eventFired = isIOS ? "touchstart" : "click";

	$('body').on(eventFired,'[data-open-popup]',function() {
		var popup = $(this).data('open-popup');

		popupService.init(popup, $scope);
	});

	$('body').on(eventFired,'.do-open-dropdown',function() {
		if($(this).hasClass('active')) {
			$('.do-open-dropdown').removeClass('active');
			$(this).removeClass('active');
		} else {
			$('.do-open-dropdown').removeClass('active');
			$(this).addClass('active');
		}
	});





	var filters_visible = false;

	function showFilters() {
		filters_visible = true;

		$('.do-filters-to-open').show();
	}

	function hideFilters() {
		filters_visible = false;

		$('.do-filters-to-open').hide();
	}

	$('body').on(eventFired,'.do-show-filters',function() {
		showFilters();
	});

	$('body').on(eventFired,'.do-close-filters',function() {
		hideFilters();
	});





	$('body').on(eventFired,'[data-tab]',function() {
		var tab_section = $(this).data('tab');

		$('[data-tab]').removeClass('active');
		$(this).addClass('active');

		$('[data-tab-section]').removeClass('active');
		$('[data-tab-section="'+tab_section+'"]').addClass('active');
	});





	$('body').on(eventFired,'[data-change-view]',function() {
		var view = $(this).data('change-view');

		$('[data-change-view]').removeClass('active');
		$(this).addClass('active');

		if(view == 'grid') {
			$('.do-change-view').removeClass('row--product--row');
		} else {
			$('.do-change-view').addClass('row--product--row');
		}
	});



	$scope.userIsLogged = false;
	$scope.connected = loginService.islogged();

	$scope.connected.then(function(msg) {
		if(msg.data) {
			$scope.userIsLogged = true;
		}
	});

	$scope.logout = function() {
		loginService.logout();
	};

	$scope.logoutAdmin = function() {
		loginAdminService.logout();
	};




	$http.get("http://ecommerce/modules/pages/controllers/links.php")
    	.success(function(data) {
        	$scope.pages = data;
    	}
	);

	$http.get("http://ecommerce/modules/categories/controllers/index.php")
		.success(function(data) {
	    	$scope.categories = data;
		}
	);

	$http.get("http://ecommerce/modules/products/controllers/search.php")
		.success(function(data) {
	    	$scope.products = data;
		}
	);
});