import { action, observable } from 'mobx';
import { RandomUtils } from '../utils/RandomUtils';
import { Grid } from './Grid';

/**
 * A GridPlan is made up of multiple grids; it's the higher level object that manages the grids within it.
 */
export class GridPlan {
  public id: string;
  @observable public grids: Grid[] = [];
  @observable public selectedGrid?: Grid;

  constructor(id: string) {
    this.id = id;
  }

  @action public addGrid() {
    const gridName = `Grid ${this.grids.length}`;
    const grid = new Grid(RandomUtils.createId(), gridName);
    this.grids.push(grid);
    this.selectedGrid = grid;
  }

  @action public selectGrid(id: string) {
    this.selectedGrid = this.grids.find((grid) => grid.id === id);
  }

  @action public deleteGrid(id: string) {
    this.grids = this.grids.filter((grid) => grid.id !== id);

    if (this.selectedGrid?.id === id) {
      this.selectedGrid = undefined;
    }
  }
}
