import { observable } from 'mobx';

export class Grid {
  @observable public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
