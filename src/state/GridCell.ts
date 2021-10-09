import { observable } from 'mobx';
import { CSSProperties } from 'react';

export class GridCell {
  public id: string;

  @observable public settings: CSSProperties = {};

  constructor(id: string) {
    this.id = id;
  }
}
