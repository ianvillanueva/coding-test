(function(app) { 
	'use strict'; 
	
	var Custom = function() {};
  
	Custom.prototype.init = function() {
        Custom.prototype.inView();
        Custom.prototype.accordion()
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
        var btn = $('.accordion-item .btn-trigger');
        console.log(btn)
        btn.on('click', function(e) {
            e.preventDefault();
            var item = $(this).closest('.accordion-item');
            if(item.hasClass('active')) {
                item.removeClass('active');
                item.find('.accordion-content').slideUp(300);  
            } else {
                item.addClass('active');
                item.find('.accordion-content').slideDown(300);  
            }
        })

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
