import { action, observable } from 'mobx';
import { CSSProperties } from 'react';
import { GridData } from '../model/GridData';
import { RandomUtils } from '../utils/RandomUtils';
import { GridCell } from './GridCell';

export class Grid {
  public id: string = RandomUtils.createId();
  @observable public name = '';
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

  constructor() {}

  @action public setName(name: string) {
    if (name) {
      this.name = name;
    }
  }

  @action public selectCell(cell: GridCell) {
    // Deselect the previous cell
    if (this.selectedCell) {
      this.selectedCell.selected = false;
    }

    // Select the new one
    this.selectedCell = cell;
    this.selectedCell.selected = true;
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
      const cell = new GridCell();
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

  public toData(): GridData {
    return {
      id: this.id,
      name: this.name,
      rows: this.rows,
      columns: this.columns,
      cellSize: this.cellSize,
      cells: this.cells.map((cell) => cell.toData()),
    };
  }

  @action public fromData(data: GridData) {
    this.id = data.id;
    this.name = data.name;
    this.rows = data.rows;
    this.columns = data.columns;
    this.cellSize = data.cellSize;
    this.cells = data.cells.map((cellData) => new GridCell().fromData(cellData));
    this.updateGrid();

    return this;
  }

  @action private updateGrid() {
    this.settings.gridTemplateColumns = `repeat(${this.columns}, minmax(0, ${this.cellSize}px))`;
    this.settings.gridTemplateRows = `repeat(${this.rows}, minmax(0, ${this.cellSize}px))`;
  }
}
