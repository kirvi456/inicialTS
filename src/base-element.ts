import { LitElement, html, customElement, property, css } from "lit-element";
export { html, css, customElement, property };

export class BaseLit extends LitElement {
  $: any = {};

  constructor() {
    super();
  }

  public _(name: string): HTMLElement | null {
    return this.shadowRoot!.getElementById(name);
  }

  public $$(name: string): HTMLElement | null {
    return this.shadowRoot!.querySelector(name);
  }

  public $$$(name: string): NodeListOf<Element> | null {
    return this.shadowRoot!.querySelectorAll(name);
  }

  mapIDs() {
    let nodeList = this.shadowRoot!.querySelectorAll("[id]");
    for (let i = 0; i < nodeList.length; i++) {
      this.$[nodeList[i].id] = nodeList[i];
    }
  }

  fire(name: string, value: any = null, bubbles = false) {
    if (!bubbles) this.dispatchEvent(new CustomEvent(name, { detail: value }));
    else
      this.dispatchEvent(
        new CustomEvent(name, { detail: value, bubbles: true, composed: true })
      );
  }

  isObject(val: any) {
    if (val === null) {
      return false;
    }
    return typeof val === "function" || typeof val === "object";
  }

  isFunction(functionToCheck: any) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  isObjectEmpty(val: any) {
    return this.isObject(val) && Object.keys(val).length === 0;
  }

  public scrollTo(): void {
    //this.scrollToY();
  }

  /**
     *
     * @param scrollTargetY pixels to scroll. Ej:
        const ticketsBlockPositionY = this.$.contact.getBoundingClientRect().top + Element.scrollTop;
     * @param time Time to scroll
     * @param easing
     * @param target scrollTarget Element
     */
  //'easeOutSine' | 'easeOutSine' | 'easeInOutQuint'
  protected scrollToY(
    scrollTargetY = 0,
    time = 600,
    easing: string = "easeOutSine",
    target: HTMLElement | Window
  ): void {
    let currentTime = 0;
    const animationTime = time / 1000;

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations: any = {
      easeOutSine: (pos: number): number => Math.sin(pos * (Math.PI / 2)),
      easeInOutSine: (pos: number): number =>
        -0.5 * (Math.cos(Math.PI * pos) - 1),
      easeInOutQuint: (pos: number): number => {
        if ((pos /= 0.5) < 1) {
          return 0.5 * Math.pow(pos, 5);
        }
        return 0.5 * (Math.pow(pos - 2, 5) + 2);
      },
    };

    // add animation loop
    function tick() {
      currentTime += 1 / 60;

      const p = currentTime / animationTime;
      const t = easingEquations[easing](p);

      const scrollTop =
        (target as Window).pageYOffset ||
        (target as HTMLElement).scrollTop ||
        0;

      const newPosition = scrollTop + (scrollTargetY - scrollTop) * t;

      if (p < 1) {
        window.requestAnimationFrame(tick);
        (target as HTMLElement).scrollTop = newPosition;
      }
    }
    tick();
  }

  /**
   *
   * @param {*} element : The HTMLElement to add,remove or toggle the classes to
   * @param {*} classesList : Either a String or an Array
   * @param {*} option : The option to select the operation 0 to toggle, 1 to add, 2 to remove
   */
  public toggleAddRemoveClasses(
    element: HTMLElement,
    classesList: string | [string],
    option = 0
  ): boolean {
    let selector = element;
    let classes: any = classesList || "";
    if (
      (typeof classes == "string" || Array.isArray(classes)) &&
      classes.length
    ) {
      let classList = selector.classList;
      if (!Array.isArray(classes)) {
        classes = (classes as string).replace(/(,\s*|\s+)/g, " ").split(" ");
      }

      for (let className of classes) {
        switch (option) {
          case 0:
            classList.toggle(className);
            break;
          case 1:
            classList.add(className);
            break;
          case 2:
            classList.remove(className);
            break;
        }
      }
      return true;
    }
    return false;
  }
}
