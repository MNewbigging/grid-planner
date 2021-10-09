import { action, observable } from 'mobx';
import { RandomUtils } from '../utils/RandomUtils';
import { GridCell } from './GridCell';

export class Grid {
  public id: string;
  @observable public name: string;
  public rows: number = 5;
  public columns: number = 5;
  @observable public cellSize: number = 30;
  // For rendering in order
  @observable public cells: GridCell[] = [];
  // For accessing & mutating quickly
  @observable public cellsMap = new Map<string, GridCell>();
  @observable.ref public selectedCell?: GridCell;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;

    this.createCells(this.rows, this.columns);
  }

  @action public setName(name: string) {
    if (name) {
      this.name = name;
    }
  }

  @action public setCellSize(size: string) {
    const value = parseInt(size, 10);
    if (value && value > 0) {
      this.cellSize = value;
    }
  }

  @action public async createCells(rows: number, columns: number) {
    const tempCells: GridCell[] = [];
    const tempCellsMap = new Map<string, GridCell>();

    for (let i = 0; i < rows * columns; i++) {
      const cell = new GridCell(RandomUtils.createId(12));
      tempCells.push(cell);
      tempCellsMap.set(cell.id, cell);
    }

    this.rows = rows;
    this.columns = columns;
    this.cells = tempCells;
    this.cellsMap = tempCellsMap;
  }

  @action public selectCell(cell: GridCell) {
    this.selectedCell = cell;
  }
}
