import { action, observable } from 'mobx';

/**
 * A GridPlan is made up of multiple grids; it's the higher level object that manages the grids within it.
 */
export class GridPlan {
  public id: string;
  @observable public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @action public setName(name: string) {
    this.name = name;
  }
}
