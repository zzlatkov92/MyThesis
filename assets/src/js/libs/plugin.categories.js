var isIOS = /iphone|ipad/gi.test(navigator.appVersion),
	eventFired = isIOS ? "touchstart" : "click",
	categories_visible = false;

function showCategories() {
	if(!categories_visible) {
	 	categories_visible = true;

		$('.do-categories-to-show').show();
	}
}

function hideCategories() {
	if(categories_visible) {
		categories_visible = false;

		$('.do-categories-to-show').hide();
	}
}

$('body').on(eventFired,'.do-show-categories',function() {
	showCategories();
});

$('body').on(eventFired,'.do-close-categories',function() {
	hideCategories();
});