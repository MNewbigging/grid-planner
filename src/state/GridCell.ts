import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { GridCellData } from '../model/GridCellData';
import { RandomUtils } from '../utils/RandomUtils';
import { BorderSettings } from './cell-settings/BorderSettings';
import { TextSettings } from './cell-settings/TextSettings';
import { CellTemplate } from './CellTemplate';

export class GridCell {
  public id: string = RandomUtils.createId(12);
  @observable public selected = false;
  @observable public settings: CSSProperties = {};
  @observable public allBorderSettings: BorderSettings;
  @observable public topBorderSettings: BorderSettings;
  @observable public rightBorderSettings: BorderSettings;
  @observable public botBorderSettings: BorderSettings;
  @observable public leftBorderSettings: BorderSettings;
  @observable public bgImageName = '';
  @observable public textSettings: TextSettings;

  constructor() {
    this.createBorderSettings();

    this.textSettings = new TextSettings(this.settings);

    // Default background colour
    this.settings.backgroundColor = 'rgba(255, 255, 255, 1)';
  }

  @action public applyTemplate(template: CellTemplate) {
    // Override settings with template settings
    this.settings = { ...template.settings };

    // Update settings classes with new values
    this.textSettings.updateSettings(this.settings, template.text);
    this.allBorderSettings.applyProps(template.allBorderProps);
    this.topBorderSettings.applyProps(template.topBorderProps);
    this.rightBorderSettings.applyProps(template.rightBorderProps);
    this.botBorderSettings.applyProps(template.botBorderProps);
    this.leftBorderSettings.applyProps(template.leftBorderProps);
  }

  @action public fromData(data: GridCellData) {
    this.id = data.id;
    this.settings = { ...data.settings };
    this.bgImageName = data.bgImageName;
    this.textSettings.setText(data.text);

    return this;
  }

  @action public reset() {
    this.settings.backgroundColor = 'rgba(255, 255, 255, 1)';
    this.bgImageName = '';
    this.settings.backgroundImage = '';

    this.textSettings.setDefaultValues();
    this.allBorderSettings.setDefaultValues();
    this.topBorderSettings.setDefaultValues();
    this.rightBorderSettings.setDefaultValues();
    this.botBorderSettings.setDefaultValues();
    this.leftBorderSettings.setDefaultValues();
  }

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };

  @action public setBackgroundImage = (fileList: FileList) => {
    // Only choose the first file
    const file = fileList.item(0);
    const reader = new FileReader();

    reader.onloadend = () => {
      this.settings.backgroundImage = `url(${reader.result})`;
      this.bgImageName = file.name;
    };

    reader.readAsDataURL(file);
  };

  @action public removeBackgroundImage = () => {
    this.settings.backgroundImage = '';
    this.bgImageName = '';
  };

  public toData(): GridCellData {
    return {
      id: this.id,
      settings: this.settings,
      bgImageName: this.bgImageName,
      text: this.textSettings.text,
    };
  }

  private createBorderSettings() {
    this.allBorderSettings = new BorderSettings(this.updateAllBorders);
    this.topBorderSettings = new BorderSettings(this.updateTopBorder);
    this.rightBorderSettings = new BorderSettings(this.updateRightBorder);
    this.botBorderSettings = new BorderSettings(this.updateBotBorder);
    this.leftBorderSettings = new BorderSettings(this.updateLeftBorder);
  }

  @action private updateAllBorders = () => {
    const { active, size, radius, color, type } = this.allBorderSettings;

    const borderShorthand = active ? `${size}px ${type} ${color}` : '';
    const borderRadius = active ? `${radius}%` : '';

    // Must check that the other borders aren't active; they take precedence
    if (!this.topBorderSettings.active) {
      this.settings.borderTop = borderShorthand;
      this.settings.borderTopRightRadius = borderRadius;
    }
    if (!this.rightBorderSettings.active) {
      this.settings.borderRight = borderShorthand;
      this.settings.borderBottomRightRadius = borderRadius;
    }
    if (!this.botBorderSettings.active) {
      this.settings.borderBottom = borderShorthand;
      this.settings.borderBottomLeftRadius = borderRadius;
    }
    if (!this.leftBorderSettings.active) {
      this.settings.borderLeft = borderShorthand;
      this.settings.borderTopLeftRadius = borderRadius;
    }
  };

  @action private updateTopBorder = () => {
    const { active, size, radius, color, type } = this.topBorderSettings;

    if (active) {
      this.settings.borderTop = `${size}px ${type} ${color}`;
      this.settings.borderTopRightRadius = `${radius}%`;
    } else {
      // Revert to all border settings
      this.updateAllBorders();
    }
  };

  @action private updateRightBorder = () => {
    const { active, size, radius, color, type } = this.rightBorderSettings;

    if (active) {
      this.settings.borderRight = `${size}px ${type} ${color}`;
      this.settings.borderBottomRightRadius = `${radius}%`;
    } else {
      this.updateAllBorders();
    }
  };

  @action private updateBotBorder = () => {
    const { active, size, radius, color, type } = this.botBorderSettings;

    if (active) {
      this.settings.borderBottom = `${size}px ${type} ${color}`;
      this.settings.borderBottomLeftRadius = `${radius}%`;
    } else {
      this.updateAllBorders();
    }
  };

  @action private updateLeftBorder = () => {
    const { active, size, radius, color, type } = this.leftBorderSettings;

    if (active) {
      this.settings.borderLeft = `${size}px ${type} ${color}`;
      this.settings.borderTopLeftRadius = `${radius}%`;
    } else {
      this.updateAllBorders();
    }
  };
}
