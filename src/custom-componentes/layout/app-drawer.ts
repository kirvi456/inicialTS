import {
  BaseLit,
  customElement,
  property,
  css,
  html,
} from "../../base-element";

@customElement("app-drawer")
export class AppDrawer extends BaseLit {
  static styles = [
    css`
      :host {
        position: fixed;
        z-index: 1;
        top: -120px;
        right: 0;
        bottom: -120px;
        left: 0;
        visibility: hidden;
        opacity: 0;
        transition: opacity 250ms linear, visibility 0s linear 250ms;
      }
      :host([opened]) {
        visibility: visible;
        opacity: 1;
        transition: opacity 250ms linear, visibility 250s linear;
      }
      :host([persistent]) {
        width: var(--app-drawer-width, 256px);
      }
      :host([persistent][position="left"]) {
        right: auto;
      }
      :host([persistent][position="right"]) {
        left: auto;
      }
      #content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: var(--app-drawer-width, 256px);
        padding: var(--app-drawer-content-padding, 120px 0);
        transition-property: -webkit-transform;
        transition-property: transform;
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        transition: transform 300ms ease-out;
        background-color: #fff;
      }
      #content[persistent] {
        width: 100%;
      }
      #content[position="right"] {
        right: 0;
        left: auto;
        -webkit-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
      }
      #content[swipe-open]::after {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 100%;
        visibility: visible;
        width: 20px;
        content: "";
      }
      #content[swipe-open][position="right"]::after {
        right: 100%;
        left: auto;
      }
      #content[opened] {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      #scrim {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: opacity 0.3s cubic-bezier(0, 0, 0.3, 1);
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        opacity: 0;
        background: var(--app-drawer-scrim-background, rgba(0, 0, 0, 0.5));
      }
      #scrim.visible {
        opacity: 1;
      }
      :host([no-transition]) #content {
        transition-property: none;
      }
    `,
  ];

  render() {
    return html` <div
        id="scrim"
        class="${this.opened ? "visible" : ""}"
        @click="${this.close}"
      ></div>
      <div
        id="content"
        ?opened="${this.opened}"
        ?persistent="${this.persistent}"
        ?swipe-open="${this.swipeOpen}"
      >
        <slot></slot>
      </div>`;
  }

  /**
   * The opened state of the drawer.
   */
  @property({ type: Boolean, reflect: true })
  opened = false;

  @property({ type: Boolean, reflect: true })
  swipeOpen = false;

  /**
   * The drawer does not have a scrim and cannot be swiped close.
   */
  @property({ type: Boolean, reflect: true })
  persistent = false;

  /**
   * The computed, read-only position of the drawer on the screen ('left' or
   * 'right').
   */
  @property({ type: String, reflect: true })
  position = "left";

  /**
   * Trap keyboard focus when the drawer is opened and not persistent.
   */
  @property({ type: Boolean })
  noFocusTrap = false;

  /**
   * Disables swiping on the drawer.
   */
  @property({ type: Boolean })
  disableSwipe = false;

  @property({ type: Object })
  props: { [k: string]: any } = {
    _translateOffset: 0,
    _trackDetails: undefined,
    _drawerState: 0,
    _boundEscKeydownHandler: undefined,
    _firstTabStop: undefined,
    _lastTabStop: undefined,
  };

  public connectedCallback(): void {
    super.connectedCallback();

    this.props["_boundEscKeydownHandler"] = this._escKeydownHandler.bind(this);
    this.props["_tabKeydownHandler"] = this._tabKeydownHandler.bind(this);
    this.addEventListener("keydown", this.props._tabKeydownHandler);
    this.addEventListener("keydown", this.props._boundExcKeydownHandler);

    this.fire("app-reset-layout");
  }

  private _tabKeydownHandler(event: {
    keyCode: number;
    shiftKey: any;
    preventDefault: () => void;
  }): void {
    if (this.noFocusTrap) {
      return;
    }

    var TAB_KEYCODE = 9;
    if (
      this.props._drawerState === this.props["_DRAWER_STATE.OPENED"] &&
      event.keyCode === TAB_KEYCODE
    ) {
      if (event.shiftKey) {
        if (
          this.props._firstTabStop &&
          (event as KeyboardEvent).target === this.props._firstTabStop
        ) {
          event.preventDefault();
          (this.props._lastTabStop! as HTMLElement).focus();
        }
      } else {
        if (
          this.props._lastTabStop &&
          (event as KeyboardEvent).target ===
            (this.props._lastTabStop! as HTMLElement)
        ) {
          event.preventDefault();
          (this.props._firstTabStop! as HTMLElement).focus();
        }
      }
    }
  }

  private _escKeydownHandler(event: {
    keyCode: number;
    preventDefault: () => void;
  }): void {
    var ESC_KEYCODE = 27;
    if (event.keyCode === ESC_KEYCODE) {
      // Prevent any side effects if app-drawer closes.
      event.preventDefault();
      this.close();
    }
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.props._boundEscKeydownHandler);
    this.removeEventListener("keydown", this.props._tabKeydownHandler);
  }

  /**
   * Opens the drawer.
   */
  public open(): void {
    this.opened = true;
    this.fire("drawer-opened-changed", true);
  }

  /**
   * Closes the drawer.
   */
  public close(): void {
    this.opened = false;
    this.fire("drawer-opened-changed", false);
  }

  toggleClassMenu(): void {
    if (!this.$.content.classList.contains("menu--visible")) {
      this.$.content.classList.add("menu--visible");
    } else {
      this.$.content.classList.remove("menu--visible");
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-drawer": AppDrawer;
  }
}
