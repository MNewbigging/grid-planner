import { observable } from 'mobx';

import { GridPlan } from './GridPlan';

export class GridPlannerState {
  @observable.ref public currentGridPlan?: GridPlan;
}
