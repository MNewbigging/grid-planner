import { observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../utils/RandomUtils';
import { toastManager } from '../utils/ToastManager';
import { GridCell } from './GridCell';

export class CellTemplate {
  public id: string;
  @observable public name: string;
  @observable public linkedCells: string[] = [];
  @observable public settings: CSSProperties;
  @observable public text: string;

  constructor(name: string, cell: GridCell) {
    this.id = RandomUtils.createId();
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

    toastManager.okToast('Updated cell template');
  }
}
