import { observable } from 'mobx';

export class Grid {
  public id: string;
  @observable public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
