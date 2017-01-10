function gallery() {
	$('.do-init-slider-gallery').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow: '<a href="javascript:;" class="slick-arrow slick-prev"><span><svg viewBox="0 0 477.175 477.175"><use xlink:href="http://ecommerce/assets/build/img/sprite.svg#icon_prev"></use></svg></span></a>',
		nextArrow: '<a href="javascript:;" class="slick-arrow slick-next"><span><svg viewBox="0 0 477.175 477.175"><use xlink:href="http://ecommerce/assets/build/img/sprite.svg#icon_next"></use></svg></span></a>'
	});
}

function multipleGallery() {
	$('.do-init-slider-multiple-gallery').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		prevArrow: '<a href="javascript:;" class="slick-arrow slick-prev"><span><svg viewBox="0 0 477.175 477.175"><use xlink:href="http://ecommerce/assets/build/img/sprite.svg#icon_prev"></use></svg></span></a>',
		nextArrow: '<a href="javascript:;" class="slick-arrow slick-next"><span><svg viewBox="0 0 477.175 477.175"><use xlink:href="http://ecommerce/assets/build/img/sprite.svg#icon_next"></use></svg></span></a>',
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 1,
		        slidesToScroll: 1
		      }
		    }
	  	]
	});
}