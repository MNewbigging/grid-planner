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
  @observable public active = false;
  @observable public size = 0;
  @observable public radius = 0;
  @observable public color = '#000000';
  @observable public type = BorderType.SOLID;

  constructor(private update: () => void) {}

  public getTypeOptions() {
    return Array.from(Object.values(BorderType));
  }

  public toggleActive = () => {
    this.active = !this.active;
    this.update();
  };

  public setSize = (size: number) => {
    if (size >= 0) {
      this.size = size;
    }

    if (this.active) {
      this.update();
    }
  };

  public setRadius = (radius: number) => {
    if (radius >= 0) {
      this.radius = radius;
    }

    if (this.active) {
      this.update();
    }
  };

  public setColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.color = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;

    if (this.active) {
      this.update();
    }
  };

  public setType = (type: BorderType) => {
    this.type = type;

    if (this.active) {
      this.update();
    }
  };
}
