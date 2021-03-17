(function(app) { 
	'use strict'; 
	
	var Carousel = function() {};

	var sampleData = [
		{
			title:'Heading 1'
		},{
			title:'Heading 2'
		},{
			title:'Heading 3'
		},{
			title:'Heading 4'
		},{
			title:'Heading 5'
		},{
			title:'Heading 6'
		}
	]
	
	
	Carousel.prototype.init = function(props) {
		console.log(this)
		var _self = this;
		// _self.create(null, {data:sampleData, isAnimated:true,});
		_self.owl();
		// _self.slick();
		
	};

	Carousel.prototype.create = function(element, options) {
		var _self = this;
		var el = element || 'owl-carousel';
		var html = '';
		html += '<div class="'+el+'">'
		html += _self.item(options.data);
		html += '</div>';
		$('carousel').replaceWith(html);
	}

	Carousel.prototype.item = function(data, options) {
		var html = '';
		$.each(data, function(index, value){
			html += '<div class="item">';
			html += '	<h4>'+value.title+'</h4>';
			html += '</div>';
		});
		return html;
	}
	
	Carousel.prototype.owl = function(element, options){
		var el = element || '.owl-carousel';
		options = options || {
			loop:true,
      		center: true,
			// margin:10,
			autoWidth:true,
			autoplay: true,
			stagePadding: $('.item-wrapper').width() / 2,
			nav:true,
			dots: true,
			navText: ["<img src='assets/img/left-arrow.svg'>","<img src='assets/img/right-arrow.svg'>"],
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1024:{
					items:3
				}
				
			}
		}
		$(el).owlCarousel(options)

		function recalcCarouselWidth(carousel) {
			var $stage = carousel.find('.owl-stage'),
				 stageW = $stage.width(),
			 $el = $('.owl-item'),
			 elW = 0;
			$el.each(function() {
				elW += $(this)[0].getBoundingClientRect().width;
			});
			if ( elW > stageW ) {
			 console.log('elW maggiore di stageW: ' +  elW + ' > ' + stageW);
			 $stage.width( Math.ceil( elW ) );
			}
		}
		$(window).on('resize', function(e){
			recalcCarouselWidth( $('.owl-carousel') );
		}).resize();
		$('.owl-carousel').on('refreshed.owl.carousel', function(event) {
			 recalcCarouselWidth( $('.owl-carousel') );
		});
		$('.owl-carousel').on('onResize.owl.carousel', function(event) {
			recalcCarouselWidth( $('.owl-carousel') );
		});
	}

	Carousel.prototype.slick = function(element, options){
		
		$('.list').slick({
			rows: 1,
			slidesToShow: 3,
			infinite: false,
			// centerMode: true,
			centerPadding: '40px',
			variableWidth: true,
			prevArrow: $('.left-arrow'),
			nextArrow: $('.right-arrow'),
			responsive: [{
			  breakpoint: 767,
			  settings: {
				rows: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: true,
				centerPadding: '0',
				// dots: true
			  }
			}]
		  });
	}

	app.Carousel = Carousel;

	app.ready(function () {
		console.log('Carousel Ready');
		Carousel.prototype.init()
	})
    
})(window.app);