// Remove hover states for touch devices

var touch = 'ontouchstart' in document.documentElement
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);

if (touch) { // remove all :hover stylesheets
    try { // prevent exception on browsers not supporting DOM styleSheets properly
        for (var si in document.styleSheets) {
            var styleSheet = document.styleSheets[si];
            if (!styleSheet.rules) continue;

            for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                if (!styleSheet.rules[ri].selectorText) continue;

                if (styleSheet.rules[ri].selectorText.match(':hover')) {
                    styleSheet.deleteRule(ri);
                }
            }
        }
    } catch (ex) {}
} 


$('.pagination .scroll-link').each(function(i, classname){
	var targetID = $(this).attr('href')
	var $this = this

	new Waypoint({
		element: $(targetID),
		handler: function(direction) {
		$($this).siblings().children('svg').removeClass('is-selected')
			$($this).children('svg').addClass('is-selected')
		}
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