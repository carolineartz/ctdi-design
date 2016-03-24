require('../css/sanitize.css');
require('../css/morphing_buttons_component.css');
require('../css/index.css');

const classie = require('classie');

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

  var UIBtnn = new UIMorphingButton( el, {
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

const cb = document.getElementById('coc');
const captcha = document.getElementById('verify-human');
const toggleButton = () => UIBtnn.toggle();
const isCocChecked = () => cb.hasAttribute('checked');

const closeOnCheck = () => {
  if (!isCocChecked()) {
    cb.setAttribute('checked', 'true');
    captcha.style.display = 'block';
  } else {
    cb.removeAttribute('checked');
    captcha.style.display = 'none';
    grecaptcha.reset();
  }
  setTimeout(function () { toggleButton(); }, 200);
}

cb.addEventListener('change', closeOnCheck);
})();


/*==========================================
=            email field styles            =
==========================================*/

const emailField = document.querySelector('#email');
const inputField = document.querySelector('.Join-email input + .indicator');
const hasContent = () => {
 if (emailField.value) {
  inputField.style.height = '100%';
  inputField.style.color = '#9A5786 !important';
  inputField.style.opacity = 1;
 } else {
  inputField.style.height = '3px';
 }
}

const fieldClicked = () => {
  inputField.style.height = '100%';
  inputField.style.color = '#9A5786 !important';
  inputField.style.opacity = 1;
}

emailField.addEventListener('blur', hasContent);
emailField.addEventListener('click', fieldClicked);



/*======================================
=            accordion tabs            =
======================================*/

const faqToggleNodes = document.querySelectorAll('.Accordion-question');
const faqToggles = [...faqToggleNodes];

const toggleClosed = (el) => {
  if (classie.has(el, 'closed')) {

  }
  else {

  }
}

// const toggleFaq = (e) => {
//   // debugger
//   let node = this;

// }

faqToggles.forEach(t => {
  t.addEventListener('click', function(event) {
    // debugger
    classie.toggle(this.closest('.Accordion'), 'closed');
  }, false);
});
