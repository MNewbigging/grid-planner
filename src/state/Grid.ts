import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { RandomUtils } from '../utils/RandomUtils';
import { GridCell } from './GridCell';

export class Grid {
  public id: string;
  @observable public name: string;
  public rows: number = 5;
  public columns: number = 5;
  public cellSize: number = 100;
  @observable public showGridLines = true;
  @observable public showGridGap = true;
  @observable public cells: GridCell[] = [];
  @observable.ref public selectedCell?: GridCell;
  @observable public settings: CSSProperties = {
    // Default settings
    backgroundColor: '#394B59',
    gap: '1px',
    padding: '1px',
  };

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

  @action public selectCell(cell: GridCell) {
    this.selectedCell = cell;
  }

  public setCellSize = (size: number) => {
    if (size > 0) {
      this.cellSize = size;
      this.updateGrid();
    }
  };

  @action public async createCells(rows: number, columns: number) {
    const tempCells: GridCell[] = [];

    for (let i = 0; i < rows * columns; i++) {
      const cell = new GridCell(RandomUtils.createId(12));
      tempCells.push(cell);
    }

    this.rows = rows;
    this.columns = columns;
    this.cells = tempCells;

    this.updateGrid();
  }

  @action public toggleGridLines = () => {
    this.showGridLines = !this.showGridLines;
    if (this.showGridLines && !this.showGridGap) {
      this.toggleGridGap();
    }

    this.settings.backgroundColor = this.showGridLines ? '#394B59' : '';
  };

  @action public toggleGridGap = () => {
    this.showGridGap = !this.showGridGap;

    this.settings.gap = this.showGridGap ? '1px' : '0px';
  };

  @action private updateGrid() {
    this.settings.gridTemplateColumns = `repeat(${this.columns}, minmax(0, ${this.cellSize}px))`;
    this.settings.gridTemplateRows = `repeat(${this.rows}, minmax(0, ${this.cellSize}px))`;
  }
}
