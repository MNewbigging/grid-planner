import { action, observable } from 'mobx';

import { RandomUtils } from '../utils/RandomUtils';
import { DetailsPanelState } from './DetailsPanelState';
import { GridPlan } from './GridPlan';

export class GridPlannerState {
  public detailsPanelState = new DetailsPanelState();
  @observable public gridPlans: GridPlan[] = [];
  @observable.ref public selectedGridPlan?: GridPlan;

  @action public addGridPlan() {
    // Create a new grid plan
    const gridPlanName = `grid_plan_${this.gridPlans.length + 1}`;
    const gridPlan = new GridPlan(RandomUtils.createId(), gridPlanName);

    // Add it to all grid plans list, focus on it
    this.gridPlans.push(gridPlan);
    this.selectedGridPlan = gridPlan;
  }
}
