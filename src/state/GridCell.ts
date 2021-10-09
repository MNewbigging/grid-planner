import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { Color, ColorResult } from 'react-color';

export class GridCell {
  public id: string;
  @observable public settings: CSSProperties = {};
  @observable public allBorders = false;
  @observable public allBorderSize = 0;
  @observable public allBorderRadius = 0;

  constructor(id: string) {
    this.id = id;

    // Default background colour
    this.settings.backgroundColor = 'white';
  }

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };

  @action public toggleAllBorders = () => {
    this.allBorders = !this.allBorders;
  };

  @action public setAllBorderSize(size: string) {
    const value = parseInt(size, 10);
    if (value >= 0) {
      this.allBorderSize = value;
    }
  }

  @action public setAllBorderRadius(radius: string) {
    const value = parseInt(radius, 10);
    if (value >= 0) {
      this.allBorderRadius = value;
    }
  }

  @action public setAllBorderColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.borderColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };
}
