// IN PROGRESS
import classie from './vendor/classie.js';


export default class MorphingButton {
  constructor(el, opts) {
    this.opts = {
      closeEl: '',
      onBeforeOpen: () => false,
      onAfterOpen: () => false,
      onBeforeClose: () => false,
      onAfterClose: () => false
    };
    Object.assign(this, {el, opts});
  }

  _init() {
    this.button = this.el.querySelector('button');
    this.expanded = false;
    this.contentEl = this.el.querySelector('.morph-content');
    this._initEvents();
  }

  _initEvents() {
    this.button.addEventListener('click', () => this.toggle());

    if (this.options.closeEl !== '') {
      let closeEl = this.el.querySelector(this.opts.closeEl);
      if (closeEl) closeEl.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    if (this.isAnimating) return false;
    if (this.expanded) this.opts.onBeforeClose();
    else {
      classie.addClass(this.el, 'active');
      this.opts.onBeforeClose();
    }

    this.isAnimating = true;
  }
}
