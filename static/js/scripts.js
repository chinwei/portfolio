$('.pagination svg').each(function(i, classname){
	var targetID = $(this).attr('data-target')
	var target = $('#'+targetID);
	var $this = this

	new Waypoint({
		element: target,
		handler: function(direction) {
		$($this).siblings().removeClass('is-selected')
			$($this).addClass('is-selected')
		}
	})
})
