import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

export default class ValleSelect extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: inline-block;
          position: relative;
          width: var(--valle-input-width ,100%);
          --tooltip-border-radius: 2px;
          --tooltip-color: rgba(16, 16, 16, 0.95);
          --tooltip-text-color: #fff;
          --tooltip-font-size: 12px;
          --tooltip-move: 4px;
        }

        .visual-hidden {
          opacity: 0;
        }

        .visual-hidden-tooltip {
          position: absolute;
          left: -10000px;
        }

        .input {
          background-color: #fff;
          box-sizing: border-box;
          border: 2px solid var(--valle-input-border-color, rgb(166, 166, 166));;
          border-radius: 4px;
          color: rgba(0, 0, 0, .87);
          display: block;
          font-size: 16px;
          margin-top: 29px;
          outline: 0;
          padding: 16px 12px 16px 16px;
          width: 100%;
          height: 50px;
          transition: all .1s linear;
        }

        .input:hover {
          cursor: pointer;
        }

        .input::placeholder {
          color: rgba(0, 0, 0, .54);
        }

        .label {
          pointer-events: none;
          display: block;
          color: rgba(0, 0, 0, .54);
          font-size: 12px;
          left: 14px;
          padding: 0 4px;
          position: absolute;
          top: 21px;
          transition: all .1s linear;
          box-sizing: border-box;
          background-color: #fff;
        }

        .button:focus .icon {
          fill: var(--valle-input-color, rgba(5, 159, 183, .87));
        }

        .icon {
          fill: rgb(166, 166, 166);
        }

        .button:focus + .input ~ .label {
          color: var(--valle-input-color, rgba(5, 159, 183, .87));
        }

        .button:focus + .input {
          border-color: var(--valle-input-color, rgba(5, 159, 183, .87));
        }

        .button {
          background: transparent;
          border: 0;
          width: 24px;
          height: 24px;
          padding: 0;
          margin: 0;
          position: absolute;
          right: 0;
          top: 44px;
        }

        .button:hover {
          cursor: pointer;
        }

        .button:focus {
          outline: none;
        }

        .tooltip ~ .button {
          top: 49px;
        }

        .description {
          color: rgba(0, 0, 0, .54);
          display: block;
          font-size: 12px;
          padding-top: 8px;
        }

        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }

        .listbox {
          position: absolute;
          top: 83px;
          left: 0;
          background:#fff;
          width: 100%;
          z-index: 4;
          padding: 8px 0;
          margin: 0;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                      0 1px 5px 0 rgba(0, 0, 0, 0.12),
                      0 3px 1px -2px rgba(0, 0, 0, 0.2);
          max-height: 200px;
          overflow: auto;
        }

        .listbox:hover {
          cursor: pointer;
        }

        :host([error]) .description,
        :host([error]) .label,
        :host([error]) .button:focus + .label {
          color: rgba(255, 0, 0, .87);
        }

        :host([error]) .input {
          border-color: rgb(255, 0, 0);
        }

        :host([error]) .icon {
          fill: rgb(255, 0, 0);
        }

        :host([disabled]) .input {
          background-color: initial;
          border-bottom: 2px solid rgba(0, 0, 0, .38);
          color: rgba(0, 0, 0, .38);
        }

        :host([disabled]) .input:hover {
          cursor: no-drop;
        }

        :host([disabled]) .button:hover {
          cursor: default;
        }

        :host([disabled]) .label {
          color: rgba(0, 0, 0, .38);
        }

        :host([disabled]) .icon {
          fill: rgba(0, 0, 0, .38);
        }

        :host([required]) .label::after {
          content: ' *';
        }

        .tooltip {
          overflow: visible;
          width: 24px;
          height: 24px;
          position: absolute;
          cursor: help;
          top: 30px;
          right: 1px;
          border-radius: 3px;
          transition: background .3s;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .tooltip:focus {
          background: #ecebeb;
          outline: none;
        }

        .tooltip svg {
          fill: var(--icon-tooltip-color, #000);
          width: 18px;
          height: 18px;
          overflow: visible;
        }

        .tooltip:hover svg{
          fill: var(--valle-input-color, rgba(5, 159, 183, .87));
        }

        .tooltip::after {
          opacity: 0;
          pointer-events: none;
          transition: all 0.18s ease-out 0.18s;
          text-indent: 0;
          font-weight: normal;
          font-style: normal;
          text-shadow: none;
          font-size: var(--tooltip-font-size);
          background: var(--tooltip-color);
          border-radius: 2px;
          color: var(--tooltip-text-color);
          border-radius: var(--tooltip-border-radius);
          content: attr(id);
          padding: .5em 1em;
          position: absolute;
          white-space: nowrap;
          z-index: 10;
        }

        .tooltip::before {
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top-color: var(--tooltip-color);
          opacity: 0;
          pointer-events: none;
          transition: all 0.18s ease-out 0.18s;
          content: "";
          position: absolute;
          z-index: 10;
        }

        .tooltip:hover::before, .tooltip:hover::after,
        .tooltip:focus::before, .tooltip:focus::after {
          opacity: 1;
          pointer-events: none;
        }

        :host([tooltippos*="-right"]) .tooltip::after {
          right: 0;
        }

        :host([tooltippos*="-right"]) .tooltip::before {
          right: 5px;
        }

        :host([tooltippos*="-right"]) .tooltip:hover::after {
          transform: translate(0, 0);
        }

        :host([tooltippos*="-right"]) .tooltip:hover::before {
          transform: translate(0, 0);
        }

        :host([tooltippos^="top"]) .tooltip::before, 
        :host([tooltippos^="top"]) .tooltip::after {
          bottom: 100%;
          transform-origin: top;
          transform: translate(0, var(--tooltip-move));
        }

        :host([tooltippos^="top"]) .tooltip::after {
          margin-bottom: 10px;
        }

        :host([tooltippos="top"]) .tooltip::before, :host([tooltippos="top"]) .tooltip::after {
          left: 50%;
          transform: translate(-50%, var(--tooltip-move));
        }

        :host([tooltippos="right"]) .tooltip:hover::after {
          transform: translate(0, -50%);
        }

        :host([tooltippos="right"]) .tooltip:hover::before {
          transform: translate(0, -50%);
        }

        :host([tooltippos="right"]) .tooltip:hover::after, :host([tooltippos="right"]) .tooltip:hover::before {
          left: 100%;
          top: 50%;
          transform: translate(calc(var(--balloon-move) * -1), -50%);
        }

        :host([tooltippos="right"]) .tooltip:hover::after {
          margin-left: 10px;
        }

        :host([tooltippos="right"]) .tooltip:hover::before {
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-right-color: var(--tooltip-color);
        }

        :host([tooltiplength]) .tooltip::after {
          white-space: normal;
        }

        :host([tooltiplength="small"]) .tooltip::after {
          width: 80px;
        }

        :host([tooltiplength="medium"]) .tooltip::after {
          width: 150px;
        }

        :host([tooltiplength="large"]) .tooltip::after {
          width: 260px;
        }

      </style>

      <div class="backdrop" id="backdrop" style="display: none;"></div>

      <template is="dom-if" if=[[tooltip]]>
        <span class="tooltip" role="tooltip" id=[[tooltip]]>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18px" height="18px">
            <path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
          <small class="visual-hidden-tooltip">[[tooltip]]</small>
        </span>
      </template>

      <button
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-pressed="false"
        aria-labelledby="label input"
        aria-describedby="description"
        id="button"
        class="button">

        <svg
          fill="#000000"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          class="icon">

          <path d="M7 10l5 5 5-5z"/>
          <path d="M0 0h24v24H0z" fill="none"/>

        </svg>

      </button>

      <input
        type="text"
        readonly
        tabindex="-1"
        aria-readonly="true"
        aria-owns="listbox"
        aria-labelledby="label"
        placeholder=[[placeholder]]
        value=[[value]]
        id="input"
        class="input">

      <label id="label" class="label">[[label]]</label>

      <ul
        role="listbox"
        tabindex="-1"
        style="display: none;"
        aria-labelledby="label"
        id="listbox"
        class="listbox">

        <slot></slot>

      </ul>

      <template is="dom-if" if={{_isNoError(error,helpertext)}}>
        <small id="description" class="description">[[helpertext]]</small>
      </template>

      <template is="dom-if" if=[[error]]>
        <span id="description" role="alert"  class="description">
          [[errortext]]<small class="visual-hidden">: [[helpertext]]</small>
        </span>
      </template>
    `;
	};

	static get properties() {
		return {
			label: String,
      helpertext: String,
      errortext: String,
      open: {
        type: Boolean,
        observer: '_toggleOpenObserver',
        reflectToAttribute: true
      },
      required: Boolean,
      disabled: {
        type: Boolean,
        observer: '_toggleDisableObserver',
        reflectToAttribute: true
      },
      placeholder: String,
      error: Boolean,
      value: String,
      options: Array,
      current: {
        type: Object,
        observer: '_setSelectedObserver'
      },
      autofocus: {
        type: Boolean,
        value: false
      },
      tooltip: String,
      tooltippos: String,
      tooltiplength: String,
		}
  };

  get state() {
    return {
      allOptions: dom(this).querySelectorAll('valle-option')
    };
  }

  ready() {
    super.ready();

    afterNextRender(this, () => {
      if (this.autofocus) {
        this.$.button.focus();
      }
    });

    this.$.button.addEventListener('click', this._toggleOpen.bind(this));
    this.$.input.addEventListener('click', this._toggleOpen.bind(this));
    this.$.button.addEventListener('keydown', this._keydownToggleOpen.bind(this));
    this.$.backdrop.addEventListener('click', this._close.bind(this));

    if (this.required) {
      this.setAttribute('aria-required', true);
      this.$.button.addEventListener('blur', this._validadeRequired.bind(this));
    }

    // Options controls
    // -----------------------------

    if (this.state.allOptions.length > 0) {
      this.state.allOptions.forEach((option, index) => {

        option.id = `listbox${index}`;

        if (option.hasAttribute('selected')) {
          this._setSelectedStateToOption(option);
        }

        option.addEventListener('click', () => {
          this._setSelectedStateToOption(option);
        });

        option.addEventListener('keydown', (event) => {
          this._keydownControlSelectedState(event, index);
        });

      });
    }

    this.options = this.state.allOptions;

  }

  _setSelectedStateToOption(option) {
    this.current = option;
    this.open = false;
  }

  _keydownControlSelectedState(event, index) {

    const pressUp = event.which === 38 || event.keyCode === 38;
    const pressDown = event.which === 40 || event.keyCode === 40;
    const pressHome = event.which === 36 || event.keyCode === 36;
    const pressEnd = event.which === 35 || event.keyCode === 35;
    const pressPageUp = event.which === 33 || event.keyCode === 33;
    const pressPageDown = event.which === 34 || event.keyCode === 34;
    const pressEsc = event.which === 27 || event.keyCode === 27;
    const pressSpace = event.which === 32 || event.keyCode === 32;
    const pressEnter = event.which === 13 || event.keyCode === 13;

    if (pressUp) {
      event.preventDefault();
      this._moveFocusToBackOption(index);
    }

    if (pressDown) {
      event.preventDefault();
      this._moveFocusToNextOption(index);
    }

    if (pressHome) {
      event.preventDefault();
      this._moveFocusToFirstOption();
    }

    if (pressEnd) {
      event.preventDefault();
      this._moveFocusToLastOption();
    }

    if (pressPageUp) {
      event.preventDefault();
      this._moveFocusToFirstOption();
    }

    if (pressPageDown) {
      event.preventDefault();
      this._moveFocusToLastOption();
    }

    if (pressEsc) {
      event.preventDefault();
      this._toggleOpen();
    }

    if (pressEnter) {
      event.preventDefault();
      this._toggleOpen();
    }

    if (pressSpace) {
      event.preventDefault();
      this._toggleOpen();
    }

  }

  _moveFocusToBackOption(currentIndex) {
    const isFisrt = currentIndex === 0;
    if (!isFisrt) this.state.allOptions[currentIndex - 1].focus();
  }

  _moveFocusToNextOption(currentIndex) {
    const isLast = currentIndex === this.state.allOptions.length - 1;
    if (!isLast) this.state.allOptions[currentIndex + 1].focus();
  }

  _moveFocusToFirstOption() {
    this.state.allOptions[0].focus();
  }

  _moveFocusToLastOption() {
    this.state.allOptions[this.state.allOptions.length - 1].focus();
  }

  _isNoError(error, helperText) {
    return !error && helperText;
  }

  _toggleOpen() {
    this.hasAttribute('open')
      ? this.removeAttribute('open')
      : this.setAttribute('open', 'true');
  }

  _toggleOpenObserver(boolean) {

    const listbox = this.$.listbox;
    const button = this.$.button;

    if (boolean) {

      listbox.style.display = 'block';
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-pressed', 'true');

      if (this.state.allOptions.length > 0) {
        this.state.allOptions[0].focus();

        this.state.allOptions.forEach((option) => {
          if (option.selected) option.focus();
        });
      }

      this.$.backdrop.style.display = 'block';

    } else {
      listbox.style.display = 'none';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-pressed', 'false');
      button.focus();

      this.$.backdrop.style.display = 'none';
    }

  }

  _close() {
    this.open = false;
  }

  _keydownToggleOpen(event) {
    const pressEnter = event.which === 13 || event.keyCode === 13;
    const pressUp = event.which === 38 || event.keyCode === 38;
    const pressDown = event.which === 40 || event.keyCode === 40;
    const pressArows = pressUp || pressDown;

    if (pressEnter) {
      event.preventDefault();
    }

    if (pressArows) {
      event.preventDefault();
      this._toggleOpen();
    }

  }

  _toggleDisableObserver() {

    const button = this.$.button;
    const input = this.$.input;

    button.hasAttribute('disabled')
      ? button.removeAttribute('disabled')
      : button.setAttribute('disabled', 'true');

    input.hasAttribute('disabled')
      ? input.removeAttribute('disabled')
      : input.setAttribute('disabled', 'true');

  }

  _validadeRequired() {
    if (!this.open) {

      const inputValue = this.$.input.value;
      const isEmpty = inputValue.length === 0;

      isEmpty
        ? this.setAttribute('error', true)
        : this.removeAttribute('error');

    }
  }

  _setSelectedObserver(option) {
    if(option) {
      const optionValue = option.getAttribute('value'); // TODO: Resolve undefined result on option.value (option.value broken the element, but cant catch from unit tests)

      this.value = optionValue;
      this.$.input.value = option.innerText;
      this.$.input['data-valle-value'] = optionValue;

      this.$.listbox.setAttribute('aria-activedescendant', option.id);

      this.state.allOptions.forEach((oldOption) => {
        if(oldOption.selected) oldOption.selected = false;
      });

      if (this.error) this.removeAttribute('error');

      if (!option.selected) option.selected = true;
    }
  }
};

customElements.define('valle-select', ValleSelect);
