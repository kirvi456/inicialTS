import { LitElement, html, customElement, css } from "lit-element";

@customElement("krv-card")
export class KrvCard extends LitElement {
  static get styles() {
    return css`
      :host {
        display:        block;        
        position:       relative;
        width:          500px;
        height:         200px;
        margin:         16px auto;
        border-radius:  16px;
        overflow:       hidden;
        box-shadow:     var(--card-shadow);
        background:     var(--global-background);
      }

      :host [hidden] {
        display:        none;
      }

      .top-mini-bar {
        height:         6px;
        min-height:     6px;
        max-height:     6px;
        background:     var(--c2-grad-light-blue);
        width:          100%;
        position:       relative;
      }

      .content {
        position:       relative;        
        width           100%:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       100% - 6px;
        height:         calc(100% - 6px);
      }
    `;
  }

  render() {
    return html`
      <div class="top-mini-bar"></div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    `;
  }
}
