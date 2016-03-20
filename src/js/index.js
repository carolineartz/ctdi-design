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

  new UIMorphingButton(el, {
    closeEl: '.icon-close',
    onBeforeOpen: function () {
      // don't allow to scroll
      noScroll();
    },
    onAfterOpen: function () {
      // can scroll again
      canScroll();
      // add class "noscroll" to body
      classie.addClass(html, 'noscroll');
      // add scroll class to main el
      classie.addClass(el, 'scroll');
    },
    onBeforeClose: function () {
      // remove class "noscroll" to body
      classie.removeClass(html, 'noscroll');
      // remove scroll class from main el
      classie.removeClass(el, 'scroll');
      // don't allow to scroll
      noScroll();
    },
    onAfterClose: function () {
      // can scroll again
      canScroll();
    }
  });
})();
// require("classie");
//


// const lineAnim1 = new TimelineMax({
// });

// const lineAnim2 = new TimelineMax({
// })

// const lineAnim3 = new TimelineMax({
// })

// const lineAnim4 = new TimelineMax({
// })

// lineAnim1.fromTo('#p1-m', 1.4, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
// lineAnim2.fromTo('#p2-m', 2.0, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
// lineAnim1.fromTo('#p3-m', 2.2, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
// lineAnim2.fromTo('#p4-m', 2.1, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
// lineAnim3.fromTo('#p5-m', 1.7, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
// lineAnim4.fromTo('#p6-m', 1.5, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
// lineAnim3.fromTo('#p7-m', 1.7, { drawSVG: '0% 0%' }, { drawSVG: '0% 100% '});
