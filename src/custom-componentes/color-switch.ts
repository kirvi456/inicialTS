import { LitElement, html, customElement, css } from "lit-element";

@customElement("color-switch")
export class ColorSwitch extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }

      :host [hidden] {
        display: none;
      }

      div {
        box-sizing: border-box;
      }

      .main-card {
        height: 100px;
        width: 500px;
        display: block;
        background: white;
        position: relative;
        margin: 16px auto;
        border-radius: 16px;
        overflow: hidden;
      }

      .top-mini-bar {
        height: 6px;
        min-height: 6px;
        background: var(--employ-one);
        width: 100%;
        position: absolute;
      }

      .content {
        position: relative;
        background: blue;
        width 100%:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       100% - 6px;
        height: calc(100% - 6px);
        top: 6px;
      }
    `;
  }

  render() {
    return html`
      <button @click=${this.cambiar}>cambiar</button>
      <button @click=${this.cambiar2}>cambiar</button>
    `;
  }

  cambiar(): void {
    this.tras();
    document.documentElement.setAttribute("theme", "dark");
  }
  cambiar2(): void {
    this.tras();
    document.documentElement.setAttribute("theme", "light");
  }

  tras(): void {
    document.documentElement.classList.add("transition");
    window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 1000);
  }
}
