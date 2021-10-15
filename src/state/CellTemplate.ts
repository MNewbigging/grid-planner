import { observable } from 'mobx';
import { CSSProperties } from 'react';
import { GridCell } from './GridCell';

export class CellTemplate {
  @observable public name: string;
  @observable public linkedCells: string[] = [];
  @observable public settings: CSSProperties;
  @observable public text: string;

  constructor(name: string, cell: GridCell) {
    this.name = name;
    this.linkedCells.push(cell.id);
    this.settings = cell.settings;
    this.text = cell.textSettings.text;
  }

  public hasLinkedCell(cellId: string) {
    return this.linkedCells.includes(cellId);
  }

  public updateTemplate(cell: GridCell) {
    this.settings = { ...cell.settings };
    this.text = cell.textSettings.text;
  }
}
