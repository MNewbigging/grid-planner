import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { ColorResult } from 'react-color';
import { BorderSettings } from './cell-settings/BorderSettings';

export class GridCell {
  public id: string;
  @observable public settings: CSSProperties = {};
  @observable public borderSettings: BorderSettings;

  constructor(id: string) {
    this.id = id;

    this.borderSettings = new BorderSettings(this.settings);

    // Default background colour
    this.settings.backgroundColor = 'white';
  }

  @action public setBackgroundColor = (color: ColorResult) => {
    const rgba = color.rgb;
    this.settings.backgroundColor = `rgba( ${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
  };
}

/**
 * TODO:
 *
 * Just make one BorderSettings class for each border setting; all, top, right, bot, left
 * Then I can make one component for each border setting and just pass them in, instead
 * of one massive input that duplicates the work
 */
