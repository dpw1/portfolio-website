$(document).ready(function() {
  $("html").addClass("js-enabled");
  setup_dense();
  start_fancybox();

  $(window).ready(function() {
    $(".js-preloader").fadeOut(800, function() {
      $(".js-main-container").fadeIn(800);

      // getMeta( "http://localhost:3000/images/udemy-learner.png" );
      setup_scrollreveal();
      lazy_load_images();
      lazy_load_initiate();
      block_click_on_invalid_link();
      add_tags_to_portfolio_and_intro();
      scroll_to_element();
    });
  });
});

function getMeta(url) {
  var img = new Image();
  img.addEventListener("load", function() {
    console.log(this.naturalWidth + " " + this.naturalHeight);
  });
  img.src = url;
}
function setup_dense() {
  if ($.isFunction($.fn.dense)) {
    $("img").dense({
      glue: "@"
    });
  }
}

function start_fancybox() {
  $("[data-fancybox]").fancybox({
    loop: true,
    thumbs: {
      autoStart: false
    },
    mobile: {
      clickOutside: "close",
      clickSlide: "close"
    },
    clickOutside: "close",
    clickSlide: "close"
  });
}

function lazy_load_images() {
  for (var each of document.querySelectorAll("img")) {
    each.classList.add("lazy");
  }
}
function lazy_load_initiate() {
  var html = `<div class="c-preloader  js-preloader">
      <div class="c-preloader__spinner  t-preloader__spinner"></div>
  </div>`;
  $(".lazy").lazy({
    beforeLoad: function(element) {
      // $(element).before(html)
    },
    afterLoad: function(element) {
      // $(element).siblings('.c-preloader').remove();
    }
  });
}
function setup_scrollreveal() {
  if (typeof ScrollReveal !== "undefined" && $.isFunction(ScrollReveal)) {
    window.sr = ScrollReveal();

    var default_config = {
      duration: 500,
      delay: 0,
      easing: "ease",
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
      viewOffset: { top: 0, right: 0, bottom: 100, left: 0 }
    });

    var default_delay = 175;

    sr.reveal(".a-header", header_config, default_delay);
    sr.reveal(".a-footer", footer_config, default_delay);
  }
}

function block_click_on_invalid_link() {
  const elementClass = "o-section__links--blocked";
  document.addEventListener(
    "click",
    function(event) {
      if (event.target.classList.contains(elementClass)) {
        event.preventDefault();
      }
    },
    false
  );
}

function add_tags_to_portfolio_and_intro() {
  const $portfolioItems = document.querySelectorAll("[data-tags]");
  const html = tags => `<p class="o-section__stack">${tags}</p>`;
  const $intro = document.querySelector("#intro .c-intro .o-content__body");
  let allTags = [];

  function add_tags_to_portfolio() {
    for (let each of $portfolioItems) {
      let tags = each
        .getAttribute("data-tags")
        .split(",")
        .map(e => `<span>#${e.trim()}</span>`);
      const currentTags = tags.join().replaceAll({
        ",": " "
      });
      each.insertAdjacentHTML("beforeend", html(currentTags));
      allTags.push(...tags);
    }
  }

  /**
   * TODO: add 'alltags' to intro
   */
  function add_tags_to_intro() {
    return $intro.insertAdjacentHTML(
      "beforeend",
      html(
        [...new Set(allTags)].join().replaceAll({
          ",": " "
        })
      )
    );
  }

  add_tags_to_portfolio();
  add_tags_to_intro();
}

function scroll_to_element() {
  function listen_for_clicks_on(id, speed) {
    const from = document.querySelector(`[href='${id}']`);
    const to = `${id}`;

    return from.addEventListener("click", e => {
      e.preventDefault();
      smoothScroll(to, speed);
    });
  }

  listen_for_clicks_on("#portfolio", 50);
  listen_for_clicks_on("#reviews", 0);
}
