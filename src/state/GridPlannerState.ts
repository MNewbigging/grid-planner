import { action, observable } from 'mobx';

import { RandomUtils } from '../utils/RandomUtils';
import { GridPlan } from './GridPlan';

export enum DetailsPanelFocus {
  HOME = 'home',
  GRID_PLAN = 'grid-plan',
  GRID = 'grid',
  GRID_CELL = 'grid-cell',
}

export class GridPlannerState {
  @observable public detailsPanelFocus = DetailsPanelFocus.HOME;
  @observable public gridPlans: GridPlan[] = [];
  @observable.ref public selectedGridPlan?: GridPlan;

  @action public addGridPlan() {
    // Create a new grid plan
    const gridPlanName = `grid_plan_${this.gridPlans.length + 1}`;
    const gridPlan = new GridPlan(RandomUtils.createId(), gridPlanName);

    // Add it to all grid plans list, select it
    this.gridPlans.push(gridPlan);
    this.selectedGridPlan = gridPlan;

    // Focus on it in details panel
    //this.detailsPanelState.setNewFocus(gridPlanName, DetailsPanelFocus.GRID_PLAN);
  }
}
