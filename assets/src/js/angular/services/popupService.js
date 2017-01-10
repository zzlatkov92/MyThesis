myApp.factory('popupService', function(ngDialog) {
	var opened_popup = null,
		opened_popups = ngDialog.getOpenDialogs();

	return {
		init: function(popup, scope, callback) {
			opened_popup = ngDialog.open({
			    template: popup,
			    scope: scope,
			    disableAnimation: true
			});

			if(opened_popups) {
				var popups = opened_popups.pop();

				for(var i = 0; i < popups.length; i++) {
		    		var current_popup = popups[i];

		    		if(current_popup) {
		    			ngDialog.close(current_popup);
		    		}
		    	}
			}

			opened_popup.closePromise.then(function () {
			    if(typeof(callback) == "function") {
					callback();
				}
			});
		},
		close: function() {
			if(opened_popups) {
				for(var i = 0; i < opened_popups.length; i++) {
		    		var current_popup = opened_popups[i];

		    		if(current_popup) {
		    			ngDialog.close(current_popup);
		    		}
		    	}
			}
		}
	}
});