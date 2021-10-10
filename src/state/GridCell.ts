import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';

export class GridCell {
  public id: string;
  @observable public settings: CSSProperties = {};
  @observable public allBorders = false;
  @observable public allBorderSize = 0;
  @observable public allBorderRadius = 0;
  @observable public allBorderColor = '';

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
    this.updateAllBorders();
  };

  @action public setAllBorderSize = (size: number) => {
    if (size >= 0) {
      this.allBorderSize = size;
    }
  };

  @action public setAllBorderRadius = (radius: number) => {
    if (radius >= 0) {
      this.allBorderRadius = radius;
    }
  };

  @action public setAllBorderColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.allBorderColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };

  @action private updateAllBorders() {
    if (this.allBorders) {
      this.settings.border = `${this.allBorderSize}px solid ${this.allBorderRadius}`;
    } else {
      this.settings.border = '';
    }
  }
}
