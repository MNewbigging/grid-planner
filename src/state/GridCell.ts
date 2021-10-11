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
  @observable public rightBorderSettings: BorderSettings;
  @observable public botBorderSettings: BorderSettings;
  @observable public leftBorderSettings: BorderSettings;

  constructor(id: string) {
    this.id = id;

    this.allBorderSettings = new BorderSettings(this.updateAllBorders);
    this.topBorderSettings = new BorderSettings(this.updateTopBorder);
    this.rightBorderSettings = new BorderSettings(this.updateRightBorder);
    this.botBorderSettings = new BorderSettings(this.updateBotBorder);
    this.leftBorderSettings = new BorderSettings(this.updateLeftBorder);

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

    // Go an update all the other borders in case this overwrote any of them
    this.updateTopBorder();
    this.updateRightBorder();
    this.updateBotBorder();
    this.updateLeftBorder();
  };

  @action private updateTopBorder = () => {
    const { active, size, radius, color, type } = this.topBorderSettings;

    if (active) {
      this.settings.borderTop = `${size}px ${type} ${color}`;
      this.settings.borderTopRightRadius = `${radius}px`;
      this.settings.borderTopLeftRadius = `${radius}px`;
    } else {
      this.settings.borderTop = this.settings.border;
      this.settings.borderTopLeftRadius = this.settings.borderRadius;
      this.settings.borderTopRightRadius = this.settings.borderRadius;
    }
  };

  @action private updateRightBorder = () => {
    const { active, size, radius, color, type } = this.rightBorderSettings;

    if (active) {
      this.settings.borderRight = `${size}px ${type} ${color}`;
      this.settings.borderTopRightRadius = `${radius}px`;
      this.settings.borderBottomRightRadius = `${radius}px`;
    } else {
      this.settings.borderRight = this.settings.border;
      this.settings.borderTopRightRadius = this.settings.borderRadius;
      this.settings.borderBottomRightRadius = this.settings.borderRadius;
    }
  };

  @action private updateBotBorder = () => {
    const { active, size, radius, color, type } = this.botBorderSettings;

    if (active) {
      this.settings.borderBottom = `${size}px ${type} ${color}`;
      this.settings.borderBottomRightRadius = `${radius}px`;
      this.settings.borderBottomLeftRadius = `${radius}px`;
    } else {
      this.settings.borderBottom = this.settings.border;
      this.settings.borderBottomRightRadius = this.settings.borderRadius;
      this.settings.borderBottomLeftRadius = this.settings.borderRadius;
    }
  };

  @action private updateLeftBorder = () => {
    const { active, size, radius, color, type } = this.leftBorderSettings;

    if (active) {
      this.settings.borderLeft = `${size}px ${type} ${color}`;
      this.settings.borderBottomLeftRadius = `${radius}px`;
      this.settings.borderTopLeftRadius = `${radius}px`;
    } else {
      this.settings.borderLeft = this.settings.border;
      this.settings.borderBottomLeftRadius = this.settings.borderRadius;
      this.settings.borderTopLeftRadius = this.settings.borderRadius;
    }
  };
}
