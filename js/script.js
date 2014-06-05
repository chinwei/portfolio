$(window).load(function(){



	// $('body').on('touchmove', function (e) {
 //         if (!$('.scrollable').has($(e.target)).length) e.preventDefault();
	//  });

// document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
// document.getElementById('inner-scroll').addEventListener('touchmove', function(e){e.stopPropagation()}, false);

// $('.scrollable').on('touchmove', function(e){e.stopPropagation()}, false);

var Site = {

	cw: $(window).width(),
	ch: $(window).height(),
	sidebar: $('#sidebar'),
	content: $('#content'),
	about: $('#about'),
	work: $('#work'),
	projectDisplayContainer: $('#project-display-container'),
	projectDisplay: $('#project-display'),
	projectList: $('#project-list li a'),
	projectMenuContainer: $('#project-menu-container'),
	sectionHeaderBar: $('.section-header-bar'),
	projectMenu: $('#project-menu'),
	expandBtn: $('#expand-btn'),
	collapseBtn: $('#collapse-btn'),
	nextBtn: $('#next-btn'),
	prevBtn: $('#prev-btn'),
	navigation: $('.page-btn > a'),
	aboutPageContainer: $('#about-page-container'),
	isExpanded: false,
	currentPage: '#work',

	init: function() {
		
		Site.resize();
		Site.handleEvent();	

		$('#project-menu-container').on("mousewheel",function(event){
			if (!Modernizr.mq('only screen and (max-width: 1024px)')) {
				 event.preventDefault();	
			}
		});


		if (!Modernizr.mq('only screen and (max-width: 1024px)')) { //desktop size
			Site.resize();

		
			$('#about, #contact').width($(window).width()-240);
		} else {
			$('.page').css('height', 'initial');
			$('#about, #contact').height($(window).height());
			$('#about, #contact').width($(window).width());

		}

		Site.introAnimation(true);
		
	},
	resizePanel: function(target, property, targetSize) {
		target.css(property, targetSize);
	},
	resize: function(){
		// alert (Site.content);
		var cw = $(window).width();
		var ch = $(window).height();
		var height;
		
		if (!Site.isExpanded) Site.switchPanel(Site.currentPage);
		
		$('.panel, window').scrollTop(0);
		
		$('#project-menu').height($('#project-list').outerHeight(true));

		
		
		  		
		
		if (Modernizr.mq('only screen and (max-width: 1024px)')) {
			// phone size
			$('#about').width($(window).width());
			$('#work').css('height', 'initial');
			Site.resizePanel($('#work'), 'width', cw*2);
			Site.resizePanel(Site.projectMenu, 'width', cw);
			// Site.resizePanel(Site.aboutPageContainer, 'width', cw);
			// Site.resizePanel(Site.content, 'height', 'initial');
			$('#content').css('height', 'initial');
			Site.resizePanel(Site.sidebar, 'height', '');
			$('#content, #sidebar').addClass('hide');
			$('#topbar').addClass('show');
			$('#wrapper').css('height', 'initial');

		} else {
			Site.projectMenuContainer.css('width', parseInt($('#work').css('width'))/2);
			// $('#wrapper').css('height', 'initial');
	  		// $('#wrapper').css('height', $('#project-display-container').css('height'));
			// Site.projectDisplayContainer.css('height', '100%');
			Site.projectDisplayContainer.height($(window).height())
			$('#work').css('height', '100%');
	  		// $('#wrapper').css('height', 'initial');
			Site.resizePanel($('#work'), 'width', (cw-Site.sidebar.width())*2);
			// $('#content').css('width', ($(window).width()-250)*2);	
			Site.resizePanel($('#wrapper'), 'height', ch);
			Site.resizePanel(Site.content, 'height', ch);
			// Site.resizePanel(Site.aboutPageContainer, 'width', cw-Site.sidebar.width());
			Site.resizePanel(Site.projectMenu, 'width', cw-Site.sidebar.width());
			Site.resizePanel(Site.sidebar, 'height', ch);
			$('#content, #sidebar').removeClass('hide');
			$('#topbar').removeClass('show reveal');

			
		}
		
		
		// Site.resizePanel(Site.content, 'height', ch);
		
		if (Modernizr.mq('only screen and (max-width: 1024px)')) {
			if (Site.isExpanded) {
				var height = $('#project-display-container').height();
		  		$('#wrapper').css('height', height);
		  		
			}
		} else {
			$('#project-menu').height($('#project-list').outerHeight(true));			
		}
		


	},
	expandPanel: function(content){
		// reveal portfolio item
		var cw = $(window).width();
		var ch = $(window).height()+80;
		
		

		if (Modernizr.mq('only screen and (max-width: 1024px)')) {
			Site.resizePanel(Site.projectDisplayContainer, 'height', $(window).height()+80+$(window).scrollTop());	
		} else {
			Site.resizePanel(Site.projectDisplayContainer, 'height', $(window).height());	
		}
		
		Site.isExpanded = true;
		Site.projectDisplayContainer.addClass('expanded');

		// bigger than phone
		if (!Modernizr.mq('only screen and (max-width: 1024px)')) {
			TweenLite.to(Site.projectMenuContainer, 0.8, {width:"55%", ease:Power2.easeInOut});
			TweenLite.to(Site.projectDisplayContainer, 0.8, {width:"45%", ease:Power2.easeInOut, onComplete: function(){
				
				Site.projectDisplayContainer.css('height', 'initial');
				Site.loadContent(content);
			}});
		} else {
			TweenLite.to(Site.projectMenuContainer, 0.8, {width:"50%", ease:Power2.easeInOut});
			TweenLite.to(Site.projectDisplayContainer, 0.8, {width:"50%", ease:Power2.easeInOut, onComplete: function(){
				
				Site.projectDisplayContainer.css('height', 'initial');
				Site.loadContent(content);
			}});
		}

		
		
		
		
	},
	collapsePanel: function(href){
		// hide portfolio item
		var cw = $(window).width();
		var ch = $(window).height();
		Site.isExpanded = false;
		

		if (Modernizr.mq('only screen and (max-width: 1024px)')) {
			Site.resizePanel(Site.projectDisplayContainer, 'height', $(window).height()+80+$(window).scrollTop());	
		} else {
			Site.resizePanel(Site.projectDisplayContainer, 'height', $(window).height());	
		}

		TweenLite.to(Site.projectDisplayContainer, 0.8, {width:"0%", ease:Power2.easeInOut, onComplete: function(){
		 $('#wrapper').css('height', '');
		 Site.resize();	
		 Site.projectDisplayContainer.removeClass('expanded');
		 if (href != undefined) Site.switchPanel(href);
		}});
	},
	switchPanel: function(href){
		var offsetTop = $(href).position().top;
		var navItem = $( ".navigation a[href='"+href+"']" ).parent();

		// Phone size
		if (Modernizr.mq('only screen and (max-width: 1024px)')) {
			
			TweenLite.to(window, 1.5, {scrollTo:{y: $(href).position().top}, ease:Power2.easeInOut});
		} else {
		// desktop
			TweenLite.to(Site.content, 1.5, {top: -offsetTop, ease:Power2.easeInOut});

			if (href != '#work') {
				Site.fadeAnimation();
			} else {
				Site.introAnimation();
			};
			$('.page-btn').removeClass('active');
			navItem.addClass('active');
		}
		
		
		
		

		
		
	},
	checkCurrentPanel: function(){

	},
	loadContent: function(content) {
		// show preloader here

		// console.log(content);
		if (Modernizr.mq('only screen and (max-width: 1024px)')) {
			Site.resizePanel(Site.projectDisplayContainer, 'height', $(window).height()+80+$(window).scrollTop());	
		} else {
			Site.resizePanel(Site.projectDisplayContainer, 'height', $(window).height());	
		}
		
		var preloader = $('#content-preloader');
		$(window).scrollTop(0);
		TweenLite.to(preloader, 0.2, {opacity: 1, ease:Power2.easeInOut});
		var url = 'portfolio/'+content.replace('#', "") + '.html';
		ga('send', 'pageview', {'page': url}); // Individual page analytics
		
		$(window).load( url, function(response, status, xhr ) {
		  if (status == 'success') {
		

		  	var target = $('#project-display');
		  	target.css('opacity', 0).html(response);
		  	$('#project-detail').waitForImages(function() {
		  		
		  	TweenLite.to(preloader, 0.5, {opacity: 0, ease:Power2.easeInOut, onComplete: function(){

		  		TweenLite.to(target, 0.2, {autoAlpha:1});
		  		
				 if (Modernizr.mq('only screen and (max-width: 1024px)')) {
		  			Site.projectDisplayContainer.css('height', 'initial');
		  			$('#wrapper').height($('#project-display-container').height());
		  			
		  		}

		  	}});



		  	});

		  }
		  if (status == 'error') {
		  	
		  }
		  
		});
	},
	removeContent: function(href) {
		var content = Site.projectMenu.find('ul li.item').eq(Site.currentSelected).find('a').attr('href');
		var target = $('#project-detail');
		
		TweenLite.to(target, 0.2, {autoAlpha:0, onComplete: function(){
			
			target.remove();
			if (href != 'close') {
				Site.collapsePanel(href)
			} else {
				Site.loadContent(content);
			};	
			
			
		}});
	},
	introAnimation: function(addclass) {
		
		// Site.projectMenuContainer.css('paddingLeft', '100%');
		// $('#project-list li').css('opacity', '0');
		var projectListItems = $('#project-list li');
		var sidebarMenuItems = $('#sidebar > ul > li')
		
		TweenMax.staggerTo(projectListItems, 1, {opacity: '1', ease:Power2.easeInOut, onComplete:function(){
			if (addclass) sidebarMenuItems.eq(0).addClass('active');	
		}}, 0.1);
	},
	fadeAnimation: function() {
		var projectListItems = $('#project-list li');
		TweenMax.staggerTo(projectListItems, 0.5, {opacity: '0', ease:Power2.easeInOut}, 0.1);
	},
	isPageEnd: function(){
		if (Site.currentSelected == 0) {
			return 'first';
		} else if (Site.currentSelected == Site.portfolioLength) {
			return 'last';
		} else {
			return 'middle';
		}
	
	},
	updateProjectDisplay: function() {
		var content = Site.projectMenu.find('ul li.item').eq(Site.currentSelected).find('a').attr('href');
		// console.log(Site.projectMenu.find('ul li').eq(Site.currentSelected);
		Site.removeContent('close');
		// Site.loadContent(content);
	},
	updatePageBtn: function(){
		switch (Site.isPageEnd()) {
			case 'first':
			Site.prevBtn.addClass('disabled');
			Site.nextBtn.removeClass('disabled');
			break;
			case 'middle':
			Site.prevBtn.removeClass('disabled');
			Site.nextBtn.removeClass('disabled');
			break;
			case 'last':
			Site.prevBtn.removeClass('disabled');
			Site.nextBtn.addClass('disabled');
			break;
		}
	},
	handleEvent: function() {
		Site.navigation.click(function(){
			 
			var href = $(this).attr('href');

			$('#topbar').removeClass('reveal');
			Site.projectMenu.find('ul > li').removeClass('disabled');
			$('body').removeClass('disabled');
			if (Site.isExpanded) {
				Site.removeContent(href);
			} else {
				Site.switchPanel(href);
			};
			return false;
		})
		Site.collapseBtn.on('mousedown', function(){
			
			Site.projectMenu.find('ul > li').removeClass('disabled');
			$('body').removeClass('disabled');
			Site.removeContent();
		})
		Site.nextBtn.click(function(){
			
			if (Site.currentSelected == Site.portfolioLength) {
				return;
			} 
			Site.currentSelected++;
			console.log(Site.currentSelected);
			Site.updateProjectDisplay();
			Site.updatePageBtn();
			
			
		})
		Site.prevBtn.click(function(){
			
			if (Site.currentSelected == 0) return;
			Site.currentSelected--;
			Site.updateProjectDisplay();
			Site.updatePageBtn();
			
		})
		Site.projectList.click(function(){
			Site.projectMenu.find('ul > li').addClass('disabled');
			$('body').addClass('disabled');
			if (Site.isExpanded) {
				return;
			};
			if ($('#topbar').hasClass('reveal')) $('#topbar').removeClass("reveal");
			var href = $(this).attr('href');
			
			
			Site.currentSelected = $(this).parent().index();
			Site.portfolioLength = Site.projectMenu.find('ul > li.item').length - 1;
			Site.expandPanel(href);
			Site.updatePageBtn();
			return false;
		})
		$('#menu').click(function(){
			$('#topbar').toggleClass("reveal");
			return false;
		})

		window.addEventListener('shake', function(){
			TweenLite.to(window, 1.5, {scrollTo:{y: 0}, ease:Power2.easeInOut});
		}, false);

		$('#topbar').drag(function( ev, dd ){
			// console.log(dd.deltaY);
			if (dd.deltaY > 0) {
				$('#topbar').addClass('reveal');
			} else {
				$('#topbar').removeClass('reveal');
			}

		})
		
		


		if (Modernizr.mq('only screen and (min-width: 1024px)')) {
			$('#project-display-container').scroll(function(){
				$('.full-width-bar').css('top', $('#project-display-container').scrollTop());
			})
		} 

            // $(document).bind('mousemove', function(e) {
            //     var ratio = e.clientY / $(window).height();
            //     var multiplier = $('#project-list').outerHeight(true) - $(window).height();
            //     // console.log($('#project-list').outerHeight(true)-$(window).height());
            //     if (!Site.isExpanded) {
            //         // $('#project-menu-container').scrollTop(ratio * multiplier);
            //         TweenLite.to($('#project-menu-container'), 0.5, {
            //             scrollTo: {
            //                 y: ratio * multiplier
            //             },
            //             ease: Power2.easeOut
            //         });
            //     }
            // })

		

		
		
			$(window).resize(function(){
				
				Site.resize();	
				$('#about, #contact').height($(window).height());

				// desktop size
				if (!Modernizr.mq('only screen and (max-width: 1024px)')) {
					
					$('#about, #contact, #project-menu-container').width($(window).width()-240);
					if (Site.isExpanded) {
						TweenLite.to(Site.projectDisplayContainer, 0.8, {width:"45%", ease:Power2.easeInOut});
						TweenLite.to(Site.projectMenuContainer, 0.8, {width:"55%", ease:Power2.easeInOut});
					}
				} else {
					
					$('#about, #contact').width($(window).width());
					if (Site.isExpanded) {
						TweenLite.to(Site.projectDisplayContainer, 0.8, {width:"50%", ease:Power2.easeInOut});
						TweenLite.to(Site.projectMenuContainer, 0.8, {width:"50%", ease:Power2.easeInOut});
					}
				}
			});
			document.addEventListener('touchmove', function(e) {
				if ($('#topbar').hasClass('reveal')) $('#topbar').removeClass('reveal');
				// e.preventDefault();z


				var pageLocations = new Array();

				for (var i=0; i<$('.page').length; i++) {
					pageLocations[i] = Math.abs($('.page').eq(i).position().top - $(window).scrollTop());
					
				}

				var value = Math.min.apply(Math, pageLocations);
				var key = pageLocations.indexOf(value);

				console.log(pageLocations, value, key);

				Site.currentPage = '#'+$('.page').eq(key).attr('id');

				console.log(Site.currentPage);

			}, true);

			// For faster response on mobile	
		    FastClick.attach(document.body);

		    
			


			
		

	}


}
	Site.init();
	
})





