import {
  BaseLit,
  customElement,
  css,
  html,
  property,
} from "../../base-element";

@customElement("krv-tab")
export class KrvTab extends BaseLit {
  @property({ type: String })
  name = "fdsafds";

  @property({ type: Boolean })
  selected = false;

  static styles = [
    css`
      :host {
        display: block;
        width: 50px;
        height: 50px;
      }

      .tab {
        width: 100%;
        height: 100%;
      }

      .tab:hover {
        background: #e4e6eb;
      }
    `,
  ];

  render() {
    return html`<div class="tab">${this.name}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "krv-tab": KrvTab;
  }
}
