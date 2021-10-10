import { observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';

export enum BorderType {
  SOLID = 'solid',
  DOTTED = 'dotted',
  DASHED = 'dashed',
  DOUBLE = 'double',
  GROOVE = 'groove',
  RIDGE = 'ridge',
  INSET = 'inset',
  OUTSET = 'outset',
}

export class BorderSettings {
  public allBorders = false;
  public allBordersSize = 0;
  public allBordersRadius = 0;
  @observable public allBordersColor = '';
  public allBordersType = BorderType.SOLID;

  constructor(private settings: CSSProperties) {}

  public toggleAllBorders = () => {
    this.allBorders = !this.allBorders;
    this.updateAllBorders();
  };

  public setAllBordersSize = (size: number) => {
    if (size >= 0) {
      this.allBordersSize = size;
    }

    this.updateAllBorders();
  };

  public setAllBordersRadius = (radius: number) => {
    if (radius >= 0) {
      this.allBordersRadius = radius;
    }

    this.updateAllBorders();
  };

  public setAllBordersColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.allBordersColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

    this.updateAllBorders();
  };

  private updateAllBorders() {
    if (this.allBorders) {
      this.settings.border = `${this.allBordersSize}px ${this.allBordersType} ${this.allBordersColor}`;
      this.settings.borderRadius = `${this.allBordersRadius}px`;
    } else {
      this.settings.border = '';
      this.settings.borderRadius = '';
    }
  }
}
