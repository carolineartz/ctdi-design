require('../css/sanitize.css');
require('../css/morphing_buttons_component.css');
require('../css/index.css');

const classie = require('classie');

(function () {
  let didScroll, scrollPosition = [0, 0];

  const noScrollFn = () => window.scrollTo(...scrollPosition);

  const noScroll = () => {
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', noScrollFn);
  };

  const canScroll = () => {
    window.removeEventListener('scroll', noScrollFn);
    scrollFn();
  }

  const scrollFn = () => window.addEventListener('scroll', scrollHandler);

  const scrollHandler = () => {
    if (!didScroll) {
      didScroll = true;
      setTimeout(() => scrollPage(), 60);
    }
  };

  const scrollPage = () => {
    scrollPosition = [window.pageXOffset, window.pageYOffset];
    didScroll = false;
  };

  scrollFn();

  const el = document.querySelector('.morph-button');
  const html = document.querySelector('html');
  const termsCheckbox =  document.getElementById('terms');

  const UIButton = new UIMorphingButton(el, {
    closeEl: '.icon-close',
    onBeforeOpen() { noScroll(); },
    onAfterOpen() {
      canScroll();
      classie.addClass(html, 'noscroll');
      classie.addClass(el, 'scroll');
    },
    onBeforeClose() {
      classie.removeClass(html, 'noscroll');
      classie.removeClass(el, 'scroll');
      noScroll();
    },
    onAfterClose() { canScroll(); }
  });

  const cb = document.getElementById('coc');
  const captcha = document.getElementById('verify-human');
  const toggleButton = () => UIButton.toggle();
  const isCocChecked = () => cb.hasAttribute('checked');

  const closeOnCheck = () => {
    window.setTimeout(toggleButton, 400);
    if (!isCocChecked()) {
      cb.setAttribute('checked', 'true');
      captcha.style.display = 'block';
      return
    } else {
      cb.removeAttribute('checked');
      captcha.style.display = 'none';
      return
    }
  }
  termsCheckbox.addEventListener('change', closeOnCheck);
})();
