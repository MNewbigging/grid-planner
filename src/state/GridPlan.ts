import { action, observable } from 'mobx';
import { Grid } from './Grid';

/**
 * A GridPlan is made up of multiple grids; it's the higher level object that manages the grids within it.
 */
export class GridPlan {
  public id: string;
  @observable public name: string;
  @observable public grids: Grid[] = [];
  @observable public selectedGrid?: Grid;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @action public setName(name: string) {
    this.name = name;
  }

  @action public addGrid() {
    const gridName = `Grid ${this.grids.length}`;
    const grid = new Grid(gridName);
    this.grids.push(grid);
    this.selectedGrid = grid;
  }
}
