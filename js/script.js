class BoxShadowGenerator {
  constructor(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    radius,
    radiusRef,
    canvaColor,
    canvaColorRef,
    backColor,
    backColorRef,
    previewBox,
    previewConteiner,
    rule,
    webkitRule,
    mozRule
  ) {
    this.horizontal = horizontal;
    this.horizontalRef = horizontalRef;
    this.vertical = vertical;
    this.verticalRef = verticalRef;
    this.blur = blur;
    this.blurRef = blurRef;
    this.spread = spread;
    this.spreadRef = spreadRef;
    this.color = color;
    this.colorRef = colorRef;
    this.opacity = opacity;
    this.opacityRef = opacityRef;
    this.inset = inset;
    this.insetRef = inset.checked;
    this.radius = radius;
    this.radiusRef = radiusRef;
    this.canvaColor = canvaColor;
    this.canvaColorRef = canvaColorRef;
    this.backColor = backColor;
    this.backColorRef = backColorRef;
    this.previewBox = previewBox;
    this.previewConteiner = previewConteiner;
    this.rule = rule;
    this.webkitRule = webkitRule;
    this.mozRule = mozRule;
  }

  initialize() {
    this.syncValues();
    this.applyRule();
    this.showRule();
    this.registerEvents();
  }

  syncValues() {
    this.horizontalRef.value = this.horizontal.value;
    this.verticalRef.value = this.vertical.value;
    this.blurRef.value = this.blur.value;
    this.spreadRef.value = this.spread.value;
    this.colorRef.value = this.color.value;
    this.opacityRef.value = this.opacity.value;
    this.radiusRef.value = this.radius.value;
    this.canvaColorRef.value = this.canvaColor.value;
    this.backColorRef.value = this.backColor.value;
  }

  updateValue(type, value) {
    switch (type) {
      case "horizontal":
        this.horizontalRef.value = value;
        this.horizontal.value = value;
        break;
      case "vertical":
        this.verticalRef.value = value;
        this.vertical.value = value;
        break;
      case "spread":
        this.spreadRef.value = value;
        this.spread.value = value;
        break;
      case "blur":
        this.blurRef.value = value;
        this.blur.value = value;
        break;
      case "color":
        this.colorRef.value = value;
        this.color.value = value;
        break;
      case "opacity":
        this.opacityRef.value = value;
        this.opacity.value = value;
        break;
      case "radius":
        this.radiusRef.value = value;
        this.radius.value = value;
        break;
      case "canvaColor":
        this.canvaColorRef.value = value;
        this.canvaColor.value = value;
        break;
      case "backColor":
        this.backColorRef.value = value;
        this.backColor.value = value;
        break;
      case "inset":
        this.insetRef = value;
        this.inset.checked = value;
        break;
    }

    this.applyRule();
    this.showRule();
  }

  registerEvents() {
    const elements = [
      { ref: this.horizontalRef, input: this.horizontal, type: "horizontal" },
      { ref: this.verticalRef, input: this.vertical, type: "vertical" },
      { ref: this.blurRef, input: this.blur, type: "blur" },
      { ref: this.spreadRef, input: this.spread, type: "spread" },
      { ref: this.colorRef, input: this.color, type: "color" },
      { ref: this.opacityRef, input: this.opacity, type: "opacity" },
      { ref: this.radiusRef, input: this.radius, type: "radius" },
      { ref: this.canvaColorRef, input: this.canvaColor, type: "canvaColor" },
      { ref: this.backColorRef, input: this.backColor, type: "backColor" },
    ];

    elements.forEach((element) => {
      element.ref.addEventListener("input", (e) => {
        const value = e.target.value;
        this.updateValue(element.type, value);
      });

      element.input.addEventListener("input", (e) => {
        const value = e.target.value;
        this.updateValue(element.type, value);
      });
    });

    this.inset.addEventListener("input", (e) => {
      const value = e.target.checked;
      this.updateValue("inset", value);
    });
  }

  applyRule() {
    const rgbValue = this.hexToRgb(this.colorRef.value);

    const shadowRule = `${this.insetRef ? "inset" : ""} ${
      this.horizontalRef.value
    }px ${this.verticalRef.value}px ${this.blurRef.value}px ${
      this.spreadRef.value
    }px rgba(${rgbValue}, ${this.opacityRef.value})`;
    const borderRadius = `${this.radiusRef.value}px`;
    const canvaColor = `${this.canvaColorRef.value}`;
    const backColor = `${this.backColorRef.value}`;

    this.previewBox.style.boxShadow = shadowRule;
    this.previewBox.style.borderRadius = borderRadius;
    this.previewBox.style.backgroundColor = canvaColor;
    this.previewConteiner.style.backgroundColor = backColor;
    this.currentRule = shadowRule;
  }

  showRule() {
    const ruleWithSemiColon = `${this.currentRule};`;

    this.rule.innerText = ruleWithSemiColon;
    this.webkitRule.innerText = ruleWithSemiColon;
    this.mozRule.innerText = ruleWithSemiColon;
  }

  hexToRgb(hex) {
    return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${
      ("0x" + hex[5] + hex[6]) | 0
    }`;
  }
}

// Selecionar elementos
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");
const previewBox = document.querySelector("#box");
const previewConteiner = document.querySelector("#preview");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");

const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");

const inset = document.querySelector("#inset");

const radius = document.querySelector("#border-radius");
const radiusRef = document.querySelector("#radius-value");

const backColor = document.querySelector("#back-color");
const backColorRef = document.querySelector("#back-value");

const canvaColor = document.querySelector("#canva-color");
const canvaColorRef = document.querySelector("#canva-value");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator(
  horizontal,
  horizontalRef,
  vertical,
  verticalRef,
  blur,
  blurRef,
  spread,
  spreadRef,
  color,
  colorRef,
  opacity,
  opacityRef,
  inset,
  radius,
  radiusRef,
  canvaColor,
  canvaColorRef,
  backColor,
  backColorRef,
  previewBox,
  previewConteiner,
  rule,
  webkitRule,
  mozRule
);

boxShadow.initialize();
