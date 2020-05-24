import { BaseLit, customElement, property, css, html } from "./base-element";
import "./custom-componentes/layout/app-header";

@customElement("main-app")
export class MainApp extends BaseLit {
  static styles = [
    css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }
    `,
  ];

  @property()
  appTitle = "Auctions";

  render() {
    return html` <p>fjdlksfjd</p>
      <app-header .tabs=${[{ name: "tab1" }, { name: "tab2" }]}></app-header>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "main-app": MainApp;
  }
}
