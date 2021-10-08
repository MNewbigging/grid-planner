import { action, observable } from 'mobx';

import { RandomUtils } from '../utils/RandomUtils';
import { GridPlan } from './GridPlan';

export enum DetailsPanelFocus {
  GRID_PLAN = 'grid-plan',
  GRID = 'grid',
  GRID_CELL = 'grid-cell',
}

export class GridPlannerState {
  @observable public detailsPanelFocus = DetailsPanelFocus.GRID_PLAN;
  @observable.ref public gridPlan?: GridPlan;

  @action public setFocus(focus: DetailsPanelFocus) {
    this.detailsPanelFocus = focus;
  }

  @action public createGridPlan() {
    // Create a new grid plan
    const gridPlanName = 'My grid plan';
    const gridPlan = new GridPlan(RandomUtils.createId(), gridPlanName);

    // Select it, focus on it
    this.gridPlan = gridPlan;
    this.detailsPanelFocus = DetailsPanelFocus.GRID_PLAN;
  }
}
