


$(document).ready(function() {

    $('html').addClass('js-enabled');
    setup_dense();
    start_fancybox();

    $(window).ready(function() {
        $(".js-preloader").fadeOut(800, function() {
            $(".js-main-container").fadeIn(800);

            setup_scrollreveal();
            lazy_load_images();
            lazy_load_initiate();
        });
    });

});


function setup_dense()
{
    if($.isFunction($.fn.dense)) {

        $('img').dense({
            'glue': '@'
        });

    }
}

function start_fancybox(){
  $("[data-fancybox]").fancybox({
  	thumbs : {
  		autoStart : false
  	},
    mobile:{
      clickOutside : "close",
      clickSlide : "close"
      
    },
    clickOutside : "close",
    clickSlide : "close"

  });
}

function lazy_load_images(){
  for (var each of document.querySelectorAll('img')){
    each.classList.add('lazy');
  }
}
function lazy_load_initiate(){
    $('.lazy').lazy();
    console.log('lazy stareted')
}
function setup_scrollreveal(){
    if(typeof ScrollReveal !== 'undefined' && $.isFunction(ScrollReveal)) {

        window.sr = ScrollReveal();

        var default_config = {
            duration: 500,
            delay: 0,
            easing: 'ease',
            scale: 1,
            mobile: false
        };
        var header_config = $.extend(false, default_config, {
            duration: 1200,
            delay: 700
        });
        var footer_config = $.extend(false, default_config, {
            duration: 1500,
            distance: 0,
            viewOffset: {top: 0, right: 0, bottom: 100, left: 0}
        });

        var default_delay = 175;

        sr.reveal('.a-header', header_config, default_delay);
        sr.reveal('.a-footer', footer_config, default_delay);

    }

}