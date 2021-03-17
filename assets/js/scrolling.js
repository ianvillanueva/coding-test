(function(app) { 
	'use strict'; 
	
    var Scrolling = function() {};
    

    var parallaxElement;
        
  
	Scrolling.prototype.init = function() {
        var _self = this;
        // _self.universalParallax();
        parallaxElement = document.querySelectorAll('.parallax-element');
        parallaxElement = Array.prototype.slice.call(parallaxElement);
        _self.addEventHandlers();
        _self.inView();
        _self.sectionView();
        _self.footerView();
        _self.timelineView();
        TweenMax.set('.bottomright-logo', {y:($('.bottomright-logo').height() + 20), opacity:1});

        // if($('body.home').length) {
        //     _self.stickyHeader();
        // }
            _self.stickyHeader();

        // _self.depthScroll()
        
    };

    Scrolling.prototype.stickyHeader = function () {
        var header = $('.header-container');
        var border = $('.layer-background');
        var lastScrollTop = 0;
        var navMenu = $('.navigation-wrap')
        
        $(window).scroll(function(){
            var yPos = $(this).scrollTop();

            if(yPos > $('.main-header').outerHeight() - 16) {
                header.addClass('sticky');
                border.addClass('sticky');
                navMenu.addClass('active');
            } else {
                header.removeClass('sticky');
                border.removeClass('sticky');
                navMenu.removeClass('active');
            }
            lastScrollTop = yPos;
        });
    };


    Scrolling.prototype.addEventHandlers = function () {
        var _self = this;
        window.addEventListener('scroll', _self.inView, false);
        window.addEventListener('resize', _self.inView, false);
        $(window).on('resize', function () {
            if($(window).width() < 1024) {
                _self.reset();
            } else {
                _self.inView();
            }
        })

        $(window).on('scroll', function(){
        })
    }

    Scrolling.prototype.prepare = function () {
        // TweenLite.set(excerptsInner, { transformPerspective: 900 })
    }

    Scrolling.prototype.inView = function () {
        parallaxElement.forEach(function (element, index) {
            Scrolling.prototype.animateInOut(element, index);
        });


        
    }

    Scrolling.prototype.sectionView = function () {


        $(window).on('scroll', function() {
            var st = $(window).scrollTop();


            $('.section').each(function(index, value){
                if(Scrolling.prototype.isElementPartiallyInViewport(value, window.innerHeight / 2)) {
                    var section = $(value).attr('section');
                    $('.menu-link').removeClass('active');
                    $('.nav-'+section+' .menu-link').addClass('active');

                }
            })     
        })
    }

    Scrolling.prototype.footerView = function () {
        $('#section-footer').on('inview', function(event, isInView) {
            if(isInView){
                $('.navigation').addClass('sticky-nav');
                // if($('.inner-navigation').length) {
                //     $('.inner-navigation').addClass('sticky-nav');
                // }
                $('.side-logo').addClass('sticky-nav');
                $('.bg-audio-wrap').addClass('sticky-nav');
                $('.bottomright-logo').addClass('sticky-nav');
                $('.inner-bottomright-logo').addClass('sticky-nav');
                $('.social-media').addClass('sticky-nav');
                $('.social-mobile').addClass('sticky-nav');
            } else {
                // if($('.inner-navigation').length) {
                //     $('.inner-navigation').removeClass('sticky-nav');
                // }
                $('.navigation').removeClass('sticky-nav');
                $('.bg-audio-wrap').removeClass('sticky-nav');
                $('.side-logo').removeClass('sticky-nav');
                $('.bottomright-logo').removeClass('sticky-nav');
                $('.inner-bottomright-logo').removeClass('sticky-nav');
                $('.social-media').removeClass('sticky-nav');
                $('.social-mobile').removeClass('sticky-nav');
            };  
        });
    }

    Scrolling.prototype.animateInOut = function (element, index) {
        var inner = element;
        var pos = element.getBoundingClientRect();
        var elHeight = pos.height;
        var elBottomFromTop = pos.bottom;
        var elTopFromTop = pos.top;
        var elTopFromBottom = pos.top - window.innerHeight;
        var elBottomFromBottom = pos.bottom - window.innerHeight;
        var spd = element.getAttribute('parallax-speed') ? element.getAttribute('parallax-speed') : 0.3;
        var distance = element.getAttribute('parallax-distance') ? element.getAttribute('parallax-distance') : 50;
        var scale = element.getAttribute('parallax-scale') ? parseFloat(element.getAttribute('parallax-scale')) : 0;
        var scrollDirection = element.getAttribute('parallax-direction') ? element.getAttribute('parallax-direction') : 'negative';
        var mode = element.getAttribute('parallax-mode');

        var transformOffset = (elTopFromBottom / elHeight) * -parseInt(distance);
        var rotate = 1;
    
        if($(window).width() > 1023) {
            if (Scrolling.prototype.isElementPartiallyInViewport(element)) {
                if (mode === 'zoom') {
                        var speed = scale;
                        var st = $(window).scrollTop() > -1 ? $(window).scrollTop() : 0;
                        var yPos = st / parseFloat(distance);
                        var scaleVal = 1 + (Math.abs(st / (scale * 1000)))
                        TweenLite.set(inner, {
                            scale: scaleVal,
                            y: -yPos,
                            rotation:0.01,
                            // ease: Power2.easeOut
                            ease: Linear.easeNone,
                            force3D: false
                        });
                } else if (mode === 'scroll') {
                        var st = $(window).scrollTop() > -1 ? $(window).scrollTop() : 0;
                        var yPos = st / parseFloat(distance);
                        var yDirect = scrollDirection === 'positive' ? yPos : -yPos;
                        TweenLite.set(inner, {
                            y: yDirect,
                            ease: Linear.easeNone,
                            force3D:false
                        });
                } else if (mode === 'background-scroll') {
                        var st = $(window).scrollTop() > -1 ? $(window).scrollTop() : 0;
                        var yPos = st / parseFloat(distance);
                        var yDirect = scrollDirection === 'positive' ? yPos : -yPos;
                        TweenLite.set(inner, {
                            backgroundPosition: 'center '+yDirect+'px',
                            ease: Linear.easeNone,
                            force3D:false
                        });
                } else if (mode === 'rotate') {

                        rotate = 30 + Math.abs(transformOffset / 10 )
                        var rotateDirection = element.getAttribute('parallax-rotate-direction') ? element.getAttribute('parallax-rotate-direction') : 'clockwise';
                        TweenLite.to(inner, spd, {
                            rotation: (rotateDirection === 'counter-clockwise') ? -rotate : rotate,
                            ease: Linear.easeNone
                        });
                } else {
                    TweenLite.to(inner, spd, {
                        y: -transformOffset,
                        ease: Power2.easeOut,
                        force3D: false
                    });
                }
            }
        }
    }

    Scrolling.prototype.reset = function() {
        TweenMax.set('.parallax-element', {y:0, scale:1, rotation:0});
    }
    


    Scrolling.prototype.isElementPartiallyInViewport = function(el, offset) {
        //special bonus for those using jQuery
        if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

        var rect = el.getBoundingClientRect();
        var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

        var vertInView = ((rect.top + offset) <= windowHeight) && ((rect.top + rect.height) >= 0);
        var horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

        return (vertInView && horInView)
    }

    Scrolling.prototype.isElementInViewport = function(el) {
        //special bonus for those using jQuery
        if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];


        var rect = el.getBoundingClientRect();
        var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
        return (
            (rect.left >= 0)
            && (rect.top >= 0)
            && ((rect.left + rect.width) <= windowWidth)
            && ((rect.top + rect.height) <= windowHeight)
        );

    }

    Scrolling.prototype.universalParallax = function() {
        var _self = this;
            new universalParallax().init({
                speed: 8
            });
       
    }


    Scrolling.prototype.depthScroll = function() {
        if($('.layer-gradient').length) {
            $(window).on('scroll', function() {
                var st = $(window).scrollTop();
                var scrollHeight = $('#section-footer').height() + ($(window).height());
                var contentHeight = $('body').height() - scrollHeight;
                var opac = parseFloat(($(window).scrollTop() / contentHeight).toFixed(2))
                TweenMax.set($('.layer-gradient'), {opacity:opac > 1 ? 1 : opac});
            })
        }
    }

    Scrolling.prototype.timelineView = function () {
        $(window).on('scroll', function() {
            var st = $(window).scrollTop();


            $('.row-wrap').each(function(index, value){
                if(Scrolling.prototype.isElementPartiallyInViewport(value, window.innerHeight / 2)) {
                    var period = $(value).attr('period');
                    $('.'+period).addClass('active').siblings('.tl-item').removeClass('active');
                }
            })
        })

        $(window).resize(function(){
            if(!$('.side-logo').hasClass('active')) {
                TweenMax.set('.side-logo',{y:-($('.side-logo').height() + 50)});
            }
        })
    }
    
    app.Scrolling = Scrolling;

    app.ready(function () {
       
        Scrolling.prototype.init()
    })

    app.onLoad(function(){
       
        
    })


})(window.app);