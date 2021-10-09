import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { Color, ColorResult } from 'react-color';

export class GridCell {
  public id: string;

  @observable public settings: CSSProperties = {};

  constructor(id: string) {
    this.id = id;
  }

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };
}
