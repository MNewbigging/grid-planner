import { GridCellData } from './GridCellData';

export interface GridData {
  id: string;
  name: string;
  rows: number;
  columns: number;
  cellSize: number;
  cells: GridCellData[];
}
