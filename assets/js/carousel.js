(function(app) { 
	'use strict'; 
	
	var Carousel = function() {};

	
	
	Carousel.prototype.init = function(props) {
		var _self = this;
		// _self.owl();
	};

	
	
	Carousel.prototype.owl = function(element, options){
		$('.owl-carousel').owlCarousel({
			stagePadding: 50,
			loop:true,
			margin:10,
			nav:true,
			mouseDrag:false,
			touchDrag:false,
			pullDrag:false,
			freeDrag:false,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:3
				}
			}
		})
		// $(el).owlCarousel(options)

	}

	app.Carousel = Carousel;

	app.ready(function () {
		console.log('Carousel Ready');
		Carousel.prototype.init()
	})
    
})(window.app);