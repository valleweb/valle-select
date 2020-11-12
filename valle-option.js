import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

export default class ValleOption extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          min-height: 48px;
          padding: 0 16px;
          font-size: 16px;
          display: flex;
          align-items: center;
        }

        @media (min-width: 420px) {
          :host {
            min-height: 32px;
            padding: 0 24px;
            font-size: 15px;
          }
        }

        :host(:hover) {
          cursor: pointer;
        }

        :host(:focus) {
          outline: none;
          background-color: #eee;
        }
      </style>

      <slot></slot>
    `;
  };

  static get properties() {
    return {
      value: String,
      selected: {
        type: Boolean,
        value: false,
        observer: '_toggleSelectedObserver',
        reflectToAttribute: true
      }
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('role', 'option');
    this.setAttribute('tabindex', '0');
    this.addEventListener('click', this._setSelected.bind(this));
    this.addEventListener('keydown', this._handleKeyDown.bind(this));
    this.addEventListener('mouseover', this._handleHover.bind(this));
  };

  _handleKeyDown(e) {
    const pressSpace = e.which === 32 || e.keyCode === 32;
    const pressEnter = e.which === 13 || e.keyCode === 13;

    if (pressSpace || pressEnter) {
      e.preventDefault();
      this.click();
    }
  };

  _setSelected() {
    this.setAttribute('selected', 'true');
  };

  _toggleSelectedObserver(boolean) {
    boolean
    ? this.setAttribute('aria-selected', 'true')
    : this.setAttribute('aria-selected', 'false');
  };

  _handleHover() {
    this.focus();
  };
};

customElements.define('valle-option', ValleOption);
