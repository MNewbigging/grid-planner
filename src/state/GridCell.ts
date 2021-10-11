import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { BorderSettings } from './cell-settings/BorderSettings';

export class GridCell {
  public id: string;
  @observable public settings: CSSProperties = {};
  @observable public allBorderSettings: BorderSettings;

  constructor(id: string) {
    this.id = id;

    this.allBorderSettings = new BorderSettings(this.updateAllBorders);

    // Default background colour
    this.settings.backgroundColor = 'white';
  }

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };

  private updateAllBorders = () => {};
}
