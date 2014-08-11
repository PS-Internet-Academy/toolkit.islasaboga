/*jslint bitwise:true, newcap:true, nomen:true, onevar:true, plusplus:true, regexp:true */
/*globals $:false, console:false, jQuery:false */

jQuery('html').addClass('hideTools');

function init_carousel(timer, ap){
    // initialize scrollable for header
    js_loaded= true;
    try{
        api = $('.global-header div.scrollable')
        .scrollable({
            size: 1,
            clickable: false,
            loop: true,
            circular: true,
            speed: 1600
        });
        
    }
    catch(err){
      //mark the error
      js_loaded=false;
    }
    try{
        api = api.autoscroll({
            autoplay: ap,
            steps: 1,
            interval: timer,
            autopause: false
        });
    }
    catch(err){
        //mark the error
       js_loaded=false;
    }
    try{
        api = api.navigator({
            api: true
        });
    }
    catch(err){
      //mark the error
      js_loaded=false;
    }
    
}

$(function () {

    var api,
        ap = true,
        timer = 12000,
        timer_content = 8000;
        

    jQuery.fn.resizeCarousel = function () {
        return this.each(function () {
            // get the scrollable API for this carousel
            var imgHeight, baseHeight,
                $this = $(this),
                $carousel = $('.scrollable', $this),
                api = $carousel.data('scrollable'),
                $items = api.getItems(),
                $images = $('img', $items),
                carouselWidth = $carousel.width(),
                clonedClass = api.getConf().clonedClass;

            // We are resizing carousel after it has been initialized. Since it could have different default width, we need to make sure the carousel is focused on the correct item to avoid the carousel having 'sliced in half' position. In this case we position on the first item, that follows the first cloned item
            api.getItemWrap().attr('style', 'left: -' + carouselWidth + 'px');

            jQuery.each($items, function () {
                //  Adjust the widths of the carousel items
                $(this).add($('.' + clonedClass, $carousel)).width(carouselWidth);
            });

            // Adjust the heights of the carousel items. We can not do
            // this in the same jQuery.each loop with tthe width, because we
            // need all of the items to re-flow after width's adjustments.
            baseHeight = Math.max.apply(Math,
                $items
                    .map(function () {
                        return $(this).height();
                    })
                    .get()
                );

            if ($images.length === 0) {

                $this.add($carousel)
                    .height(baseHeight)
                    .trigger('resized.carousel', [baseHeight]);
            } else {
                // If the carousel has images, then we need to wait for
                // all the images to be loaded before resizing the height
                // of the carousel.
                $images.load(function () {
                    var newHeight = Math.max.apply(Math,
                        $items
                            .map(function () {
                                return $(this).height();
                            })
                            .get()
                        );
                    if (newHeight >= baseHeight) {
                        $this.add($carousel)
                            .height(newHeight)
                            .trigger('resized.carousel', [newHeight]);
                    }
                });
               //trigger resizing manually
               $this.add($carousel).height(baseHeight).trigger('resized.carousel', [baseHeight]);
            }
        });
    };

    // initialize scrollable for header
    js_loaded= true;
    try{
        api = $('.global-header div.scrollable')
        .scrollable({
            size: 1,
            clickable: false,
            loop: true,
            circular: true,
            speed: 1600
        });
        
    }
    catch(err){
      //mark the error
      js_loaded=false;
    }
    try{
        api = api.autoscroll({
            autoplay: ap,
            steps: 1,
            interval: timer,
            autopause: false
        });
    }
    catch(err){
        //mark the error
       js_loaded=false;
    }
    try{
        api = api.navigator({
            api: true
        });
    }
    catch(err){
      //mark the error
      js_loaded=false;
    }
    if(js_loaded ===false){
        // try again if the first attempt had an error
        $( window ).load(function() {
         init_carousel(timer, ap);
      });
    }
    
      // initialize scrollable for content
      /*
      api_content = $('#content div.scrollable')
        .scrollable({
            size: 1,
            clickable: false,
            loop: true,
            circular: true,
            speed: 1600
        })
        .autoscroll({
            autoplay: ap,
            steps: 1,
            interval: timer_content,
            autopause: true
        })
        .navigator({
            api: true
        });
     */

    $('.carousel').resizeCarousel();

    // Show toolBar when hovering over a carousel
    $('.carousel').hover(
        function () {
            $(this).find('.toolBar').eq(0).slideToggle('fast');
        });
});