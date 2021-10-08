import { action, observable } from 'mobx';
import { RandomUtils } from '../utils/RandomUtils';
import { GridCell } from './GridCell';

export class Grid {
  public id: string;
  @observable public name: string;
  @observable public rows: number = 5;
  @observable public columns: number = 5;
  @observable public cellSize: number = 30;
  // For rendering in order
  @observable public cells: GridCell[] = [];
  // For accessing & mutating quickly
  @observable public cellsMap = new Map<string, GridCell>();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

    this.createCells();
  }

  @action public setName(name: string) {
    if (name) {
      this.name = name;
    }
  }

  @action public setRows(rows: string) {
    const value = parseInt(rows, 10);
    if (value) {
      this.rows = value;
    }

    this.createCells();
  }

  @action public setColumns(columns: string) {
    const value = parseInt(columns, 10);
    if (value) {
      this.columns = value;
    }

    this.createCells();
  }

  @action private createCells() {
    this.cells = [];
    this.cellsMap.clear();

    for (let i = 0; i < this.columns * this.rows; i++) {
      const cell = new GridCell(RandomUtils.createId(12));
      this.cells.push(cell);
      this.cellsMap.set(cell.id, cell);
    }
  }
}
