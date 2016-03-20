// require('../css/milligram.css');
require('../css/sanitize.css');
require('../css/morphing_buttons_component.css');
require('../css/index.css');
var classie = require('classie');

(function () {
  var docElem = window.document.documentElement,
    didScroll, scrollPosition;

  // trick to prevent scrolling when opening/closing button
  function noScrollFn() {
    window.scrollTo(scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0);
  }

  function noScroll() {
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', noScrollFn);
  }

  function scrollFn() {
    window.addEventListener('scroll', scrollHandler);
  }

  function canScroll() {
    window.removeEventListener('scroll', noScrollFn);
    scrollFn();
  }

  function scrollHandler() {
    if (!didScroll) {
      didScroll = true;
      setTimeout(function () { scrollPage(); }, 60);
    }
  };

  function scrollPage() {
    scrollPosition = { x: window.pageXOffset || docElem.scrollLeft, y: window.pageYOffset || docElem.scrollTop };
    didScroll = false;
  };

  scrollFn();

  var el = document.querySelector('.morph-button');
  var html = document.querySelector('html');

  var UIButton = new UIMorphingButton(el, {
    closeEl: '.icon-close',
    onBeforeOpen: function () {
      noScroll();
    },
    onAfterOpen: function () {
      canScroll();
      classie.addClass(html, 'noscroll');
      classie.addClass(el, 'scroll');
    },
    onBeforeClose: function () {
      classie.removeClass(html, 'noscroll');
      classie.removeClass(el, 'scroll');
      noScroll();
    },
    onAfterClose: function () {
      canScroll();
    }
  });

  var toggleButton = () => UIButton.toggle();

  function closeOnCheck() {
    window.setTimeout(toggleButton, 400);
  }
  document.getElementById('terms').addEventListener('change', function () {
    // UIButton.toggle();
    closeOnCheck();
  });
})();

