import { action, observable } from 'mobx';

export class Grid {
  public id: string;
  @observable public name: string;
  @observable public width: number = 5;
  @observable public height: number = 5;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  @action public setName(name: string) {
    if (name) {
      this.name = name;
    }
  }
}
