console.log("ready!")

// $(document).on('ready', function() {


var init = function() {
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
		console.log('animate scroll')
		var target = $(this).attr('href')

		if (target == "#intro") {
			TweenLite.to(window, 1, {scrollTo: 0});
		} else {
			TweenLite.to(window, 1, {scrollTo: $(target).position().top});	
		}	

		return false;
		
	})
}

$(document).ready(function(){

	init()


	

	var HideShowTransition = Barba.BaseTransition.extend({
	  start: function() {
	    
	    // this.finish.bind(this)
	    // console.log(this.newContainerLoading)

	    Promise
	          .all([this.newContainerLoading, this.fadeOut()])
	          .then(this.fadeIn.bind(this));
	    // this.newContainerLoading.then(this.finish.bind(this));

	    $(this.newContainer).addClass('is-hidden');
	  },
	  fadeOut: function() {
	  	console.log('fade out!')
	  	$(this.oldContainer).addClass('is-hidden');

	  },
	  fadeIn: function() {
	  	
	  	var _this = this
	  	$(this.newContainer).addClass('is-hidden')

	  	setTimeout(function(){
	  		_this.done();
	  		document.body.scrollTop = 0;
	  		$('.barba-container').removeClass('is-hidden')
	  		// 	
	  	},400);
	  	
	  },



	  finish: function() {
	  	console.log('finished!')
	    document.body.scrollTop = 0;
	    this.done();
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