var isIOS = /iphone|ipad/gi.test(navigator.appVersion),
	eventFired = isIOS ? "touchstart" : "click";

var search_visible = false;

function showSearch() {
	search_visible = true;

	$('.do-search-to-be-shown').show();
}

function hideSearch() {
	search_visible = false;

	$('.do-search-to-be-shown').hide();
}

$('body').on(eventFired,'.do-show-search',function() {
	if(search_visible) {
		hideSearch();
	} else {
		showSearch();
	}
});

$('body').on(eventFired,'.do-close-search',function() {
	hideSearch();
});

hideSearch();