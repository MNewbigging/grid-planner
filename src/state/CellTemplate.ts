import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../utils/RandomUtils';
import { toastManager } from '../utils/ToastManager';
import { BorderSettingsProps } from './cell-settings/BorderSettings';
import { GridCell } from './GridCell';

export class CellTemplate {
  public id: string;
  @observable public name: string;
  @observable public linkedCells: string[] = [];
  public settings: CSSProperties;
  public text: string;
  public allBorderProps: BorderSettingsProps;
  public topBorderProps: BorderSettingsProps;
  public rightBorderProps: BorderSettingsProps;
  public botBorderProps: BorderSettingsProps;
  public leftBorderProps: BorderSettingsProps;

  constructor(name: string, cell: GridCell) {
    this.id = RandomUtils.createId();
    this.name = name;
    this.linkedCells.push(cell.id);
    this.settings = cell.settings;
    this.text = cell.textSettings.text;
    this.allBorderProps = cell.allBorderSettings.toProps();
    this.topBorderProps = cell.topBorderSettings.toProps();
    this.rightBorderProps = cell.rightBorderSettings.toProps();
    this.botBorderProps = cell.botBorderSettings.toProps();
    this.leftBorderProps = cell.leftBorderSettings.toProps();
  }

  public hasLinkedCell(cellId: string) {
    return this.linkedCells.includes(cellId);
  }

  public updateTemplate(cell: GridCell) {
    this.settings = { ...cell.settings };
    this.text = cell.textSettings.text;

    toastManager.successToast('Updated cell template');
  }

  @action setName(name: string) {
    if (name) {
      this.name = name;
    }
  }
}
