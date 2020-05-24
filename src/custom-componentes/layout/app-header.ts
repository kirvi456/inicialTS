import {
  BaseLit,
  customElement,
  css,
  html,
  property,
} from "../../base-element";
import "./krv-tab";

@customElement("app-header")
export class AppHeader extends BaseLit {
  @property({ type: Number })
  type = 1;

  @property({ type: Array })
  tabs: { name: string }[] = [];

  static styles = [
    css`
      :host {
        display: flex;
        height: 100%;
        width: 100%;
      }

      .header {
        width: 100%;
        height: 20%;
      }

      .content {
        width: 100%;
        height: 80%;
      }
    `,
  ];

  render() {
    return html` <div class="header">
        ${this.tabs.map(
          (tab) => html` <krv-tab name="${tab.name}"></krv-tab> `
        )}
      </div>

      <div class="content">
        <div id="tab1">
          <h1>tab 1</h1>
          <p>Esta es la tab 1</p>
        </div>
        <div id="tab2">
          <h1>tab 2</h1>
          <p>Esta es la tab 2</p>
        </div>
        <div id="tab3">
          <h1>tab 3</h1>
          <p>Esta es la tab 3</p>
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-header": AppHeader;
  }
}
