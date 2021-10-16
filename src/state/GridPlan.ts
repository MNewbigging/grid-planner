import { action, observable } from 'mobx';
import { GridPlanData } from '../model/GridPlanData';
import { RandomUtils } from '../utils/RandomUtils';
import { Grid } from './Grid';

/**
 * A GridPlan is made up of multiple grids; it's the higher level object that manages the grids within it.
 */
export class GridPlan {
  public id: string = RandomUtils.createId();
  @observable public grids: Grid[] = [];
  @observable public selectedGrid?: Grid;

  constructor() {}

  @action public addGrid() {
    const gridName = `Grid ${this.grids.length}`;
    const grid = new Grid(gridName);
    this.grids.push(grid);
    this.selectedGrid = grid;
  }

  @action public selectGrid(id: string) {
    this.selectedGrid = this.grids.find((grid) => grid.id === id);
  }

  @action public selectGridByIndex(index: number) {
    this.selectedGrid = this.grids[index];
  }

  @action public deleteGrid(id: string) {
    this.grids = this.grids.filter((grid) => grid.id !== id);

    if (this.selectedGrid?.id === id) {
      this.selectedGrid = undefined;
    }
  }

  public toData(): GridPlanData {
    return {
      id: this.id,
      grids: this.grids.map((grid) => grid.toData()),
    };
  }
}
