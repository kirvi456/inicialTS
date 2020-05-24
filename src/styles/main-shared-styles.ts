import { css } from "../base-element";

export const ScrollBarStyle = css`
  #main-content::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    background-color: var(--light-primary-color);
  }
  #main-content::-webkit-scrollbar-thumb {
    background-color: var(--dark-primary-color);
    border-radius: 5px 5px 0 0;
  }
  #main-content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
    background-color: #fff;
  }
`;

export const IconStyle = css`
  .icon {
    width: 24px;
    height: 24px;
    fill: var(--icon-fill-color, var(--text-primary-color, black));
    cursor: pointer;
  }
`;
export const TypographyStyle = css`
  .headline-1,
  .headline-2,
  .headline-3,
  .headline-4,
  .headline-5,
  .headline-6,
  .subtitle-1,
  .subtitle-2 {
    font-family: "Julius Sans One";
  }

  .headline-1 {
    font-size: 78;
    font-weight: lighter;
  }
  .headline-2 {
    font-size: 49;
    font-weight: lighter;
  }
  .headline-3 {
    font-size: 39;
  }
  .headline-4 {
    font-size: 28;
  }
  .headline-5 {
    font-size: 20;
  }
  .headline-6 {
    font-size: 16;
    font-weight: medium;
  }

  .body-1,
  .body-2,
  .button,
  .overline,
  .caption {
    font-family: "Crimson Text";
  }

  .body-1 {
    font-size: 20;
  }
  .body-2 {
    font-size: 18;
    font-weight: medium;
  }
  .subtitle-1 {
    font-size: 13;
  }
  .subtitle-2 {
    font-size: 11;
  }
  .button {
    font-size: 18;
  }
  .overline {
    font-size: 13;
  }
  .caption {
    font-size: 15;
  }
  .button,
  .caption,
  .overline {
    text-transform: uppercase;
  }
`;
