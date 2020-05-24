import { html, customElement, LitElement, css, property } from "lit-element";

import "@polymer/paper-input/paper-input.js";

@customElement("kvn-form")
export class KvnForm extends LitElement {
  @property({ type: Object })
  structure = {};

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
      }

      .form-mark {
        position: relative;
        width: 100%;
        height: 50%;
        margin: auto;
        overflow-y: scroll;
        box-sizing: border-box;
        padding: 15px;
      }

      .send-mark {
        width: 100%;
        heigth: 25px;
        position: relative;
        align-items: center;
        justify-content: center;
        display: flex;
      }

      button {
        width: 80%;
        margin: auto;
        border: solid;
      }

      paper-input.custom:hover {
      }

      paper-input.custom {
        position: relative;
      }
    `;
  }

  render() {
    return html` <div class="form-mark">
        <paper-input
          class="custom"
          always-float-label
          label="Floating label"
        ></paper-input>
        <paper-input
          class="custom"
          always-float-label
          label="Floating label"
        ></paper-input>
        <paper-input
          class="custom"
          always-float-label
          label="Floating label"
        ></paper-input>
      </div>
      <div class="send-mark">
        <button>Enviar</button>
        <div></div>
      </div>`;
  }
}
