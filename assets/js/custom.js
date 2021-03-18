(function(app) { 
	'use strict'; 
	
	var Custom = function() {};
  
	Custom.prototype.init = function() {
        Custom.prototype.inView();
        Custom.prototype.carousel();
	};

    Custom.prototype.inView = function() {
        $('.animated').one('inview', function(event, isInView) {
            var _this = $(this);
            var animatedChildren = _this.find('.animated-child');
            if(isInView){
                if(animatedChildren.length > 0) {
                    var animateElement = animatedChildren;
                    TweenMax.staggerTo(animateElement, 0.4, { y: 0, x:0, opacity: 1, delay: 0.3}, 0.1)
                }
            }
        });
    }

    Custom.prototype.carousel = function() {
        $('.owl-carousel').owlCarousel({
            stagePadding: 15,
            loop:false,
            margin:10,
            nav:false,
            autoWidth:true,
            mouseDrag:false,
			touchDrag:false,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:3
                }
            }
        })
    }

    Custom.prototype.accordion = function() {
       
    }



    app.Custom = Custom;

    app.ready(function () {
        console.log('Custom Ready');
        Custom.prototype.init()
    })

    app.onLoad(function(){
        console.log('Custom Load');
        
    })


})(window.app);
