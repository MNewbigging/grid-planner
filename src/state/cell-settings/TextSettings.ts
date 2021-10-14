import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';

export enum TextAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum TextDecoration {
  NONE = 'none',
  UNDERLINE = 'underline',
  STRIKETHROUGH = 'line-through',
}

export class TextSettings {
  @observable public text = '';
  @observable public xAlign = TextAlign.START;
  @observable public yAlign = TextAlign.START;
  @observable public bold = false;
  @observable public italic = false;
  @observable public decoration = TextDecoration.NONE;
  @observable public color = '#182026';

  constructor(private settings: CSSProperties) {}

  public isXAlignSelected(textAlign: TextAlign) {
    return textAlign === this.xAlign;
  }

  public isYAlignSelected(textAlign: TextAlign) {
    return textAlign === this.yAlign;
  }

  public isDecorationSelected(textDecoration: TextDecoration) {
    return textDecoration === this.decoration;
  }

  @action public setText = (text: string) => {
    this.text = text;
  };

  @action public setTextAlignX(textAlign: TextAlign) {
    this.xAlign = textAlign;

    this.settings.justifyContent = this.xAlign;
  }

  @action public setTextAlignY(textAlign: TextAlign) {
    this.yAlign = textAlign;

    this.settings.alignItems = this.yAlign;
  }

  @action public toggleBold = () => {
    this.bold = !this.bold;

    if (this.bold) {
      this.settings.fontWeight = 'bold';
    } else {
      this.settings.fontWeight = 'normal';
    }
  };

  @action public toggleItalic = () => {
    this.italic = !this.italic;

    if (this.italic) {
      this.settings.fontStyle = 'italic';
    } else {
      this.settings.fontStyle = 'normal';
    }
  };

  @action public setDecoration(decoration: TextDecoration) {
    // Buttons toggle, but several values for decoration
    if (this.decoration === decoration) {
      this.decoration = TextDecoration.NONE;
    } else {
      this.decoration = decoration;
    }

    this.settings.textDecoration = this.decoration;
  }

  @action setColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.color = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

    this.settings.color = this.color;
  };
}
