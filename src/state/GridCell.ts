import { action, observable } from 'mobx';
import { CSSProperties } from 'react';

export class GridCell {
  public id: string;

  @observable public settings: CSSProperties = {};

  constructor(id: string) {
    this.id = id;
  }

  @action public setBackgroundColor(color: string) {
    this.settings.backgroundColor = color;
  }
}
