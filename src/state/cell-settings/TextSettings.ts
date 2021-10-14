import { action, observable } from 'mobx';
import { CSSProperties } from 'react';

export enum TextAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export class TextSettings {
  @observable public text = '';
  @observable public xAlign = TextAlign.START;
  @observable public yAlign = TextAlign.START;

  constructor(private settings: CSSProperties) {}

  public isXAlignSelected(textAlign: TextAlign) {
    return textAlign === this.xAlign;
  }

  public isYAlignSelected(textAlign: TextAlign) {
    return textAlign === this.yAlign;
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
}
