import { action, observable } from 'mobx';
import { CSSProperties } from 'react';

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}

export class TextSettings {
  @observable public text = '';
  @observable public textAlign = TextAlign.LEFT;

  constructor(private settings: CSSProperties) {}

  public isAlignSelected(textAlign: TextAlign) {
    return textAlign === this.textAlign;
  }

  @action public setText = (text: string) => {
    this.text = text;
  };

  @action public setTextAlign(textAlign: TextAlign) {
    this.textAlign = textAlign;

    this.updateSettings();
  }

  @action private updateSettings() {
    this.settings.textAlign = this.textAlign;
  }
}
