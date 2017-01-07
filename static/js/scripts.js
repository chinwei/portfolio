$('.pagination .scroll-link').each(function(i, classname){
	var targetID = $(this).attr('href')
	var $this = this

	new Waypoint({
		element: $(targetID),
		handler: function(direction) {
		$($this).siblings().children('svg').removeClass('is-selected')
			$($this).children('svg').addClass('is-selected')
		},
		offset: 30
	})
})


$('a.scroll-link').on('click', function(){
	var target = $(this).attr('href')

	if (target == "#intro") {
		TweenLite.to(window, 1, {scrollTo: 0});
	} else {
		TweenLite.to(window, 1, {scrollTo: $(target).position().top});	
	}	

	return false;
	
})