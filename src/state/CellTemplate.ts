import { observable } from 'mobx';
import { CSSProperties } from 'react';

export class CellTemplate {
  @observable public name: string;
  @observable public settings: CSSProperties;
  @observable public linkedCells: string[] = [];

  constructor(name: string, settings: CSSProperties, cellId: string) {
    this.name = name;
    this.settings = settings;
    this.linkedCells.push(cellId);
  }
}
