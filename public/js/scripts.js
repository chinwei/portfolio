var init = function() {
	// Remove hover states for touch devices

	$('.pagination .scroll-link').each(function(i, classname){
		var targetID = $(this).attr('href')
		var $this = this

		new Waypoint({
			element: $(targetID),
			handler: function(direction) {
				$($this).siblings().children('svg').removeClass('is-selected')
				$($this).children('svg').addClass('is-selected')	
				// not sure why there are 2 dots highlighted at the same time
				if (direction == 'up') {
					
					if (targetID == "#intro") {
						$($this).children('svg').addClass('is-selected')
					} else {
						$($this).prev().children('svg').addClass('is-selected')
						$($this).children('svg').removeClass('is-selected')
					}
					


					console.log($($this).prev())
				} else {
					$($this).children('svg').addClass('is-selected')	
					console.log('down')
				}


				
			}
		})
	})


	$('a.scroll-link').on('click', function(){
		var target = $(this).attr('href')

		if (target == "#intro") {
			TweenLite.to(window, 1, {scrollTo: 0});
		} else {
			console.log($(target).position().top);
			TweenLite.to(window, 1, {scrollTo: $(target).position().top});	
		}	

		return false;
		
	})
}

$(document).ready(function(){

	init()

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

	var HideShowTransition = Barba.BaseTransition.extend({
	  start: function() {

	    Promise
	          .all([this.newContainerLoading, this.fadeOut()])
	          .then(this.fadeIn.bind(this));
	    $(this.newContainer).addClass('is-hidden');
	  },
	  fadeOut: function() {
	  	$(this.oldContainer).addClass('is-hidden');

	  },
	  fadeIn: function() {
	  	var _this = this
	  	$(this.newContainer).addClass('is-hidden')

	  	setTimeout(function(){
	  		_this.done();	
	  		document.body.scrollTop = 0;
	  		$('.barba-container').removeClass('is-hidden')
	  	},400);
	  }
	});


	Barba.Pjax.getTransition = function() {
	  return HideShowTransition;
	};

	Barba.Dispatcher.on('transitionCompleted', function() {
	  init();
	});


	Barba.Pjax.start();
})
