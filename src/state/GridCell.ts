import { timeStamp } from 'console';
import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { BorderSettings } from './cell-settings/BorderSettings';

export class GridCell {
  public id: string;
  @observable public settings: CSSProperties = {};
  @observable public allBorderSettings: BorderSettings;
  @observable public topBorderSettings: BorderSettings;

  constructor(id: string) {
    this.id = id;

    this.allBorderSettings = new BorderSettings(this.updateAllBorders);
    this.topBorderSettings = new BorderSettings(this.updateTopBorder);

    // Default background colour
    this.settings.backgroundColor = 'white';
  }

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };

  @action private updateAllBorders = () => {
    const { active, size, radius, color, type } = this.allBorderSettings;

    if (active) {
      this.settings.border = `${size}px ${type} ${color}`;
      this.settings.borderRadius = `${radius}px`;
    } else {
      this.settings.border = '';
      this.settings.borderRadius = '';
    }
  };

  @action private updateTopBorder = () => {
    const { active, size, radius, color, type } = this.topBorderSettings;

    if (active) {
      this.settings.borderTop = `${size}px ${type} ${color}`;
      this.settings.borderTopRightRadius = `${radius}px`;
      this.settings.borderTopLeftRadius = `${radius}px`;
    } else {
      this.settings.borderTop = this.settings.border;
      this.settings.borderTopRightRadius = this.settings.borderTopRightRadius;
      this.settings.borderTopLeftRadius = this.settings.borderTopLeftRadius;

      this.updateAllBorders();
    }
  };
}
