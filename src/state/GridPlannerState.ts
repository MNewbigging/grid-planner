import { action, observable } from 'mobx';

import { RandomUtils } from '../utils/RandomUtils';
import { toastManager } from '../utils/ToastManager';
import { CellTemplate } from './CellTemplate';
import { GridCell } from './GridCell';
import { GridPlan } from './GridPlan';

export enum DetailsPanelFocus {
  GRID_PLAN = 'grid-plan',
  GRID = 'grid',
  GRID_CELL = 'grid-cell',
  TEMPLATES = 'templates',
}

export class GridPlannerState {
  @observable public detailsPanelFocus = DetailsPanelFocus.GRID_PLAN;
  @observable.ref public gridPlan?: GridPlan;
  @observable public cellTemplates: CellTemplate[] = [];

  @action public setFocus(focus: DetailsPanelFocus) {
    this.detailsPanelFocus = focus;
  }

  @action public createGridPlan() {
    // Create a new grid plan
    const gridPlan = new GridPlan(RandomUtils.createId());

    // Select it, focus on it
    this.gridPlan = gridPlan;
    this.detailsPanelFocus = DetailsPanelFocus.GRID_PLAN;
  }

  @action public createTemplate(cell: GridCell) {
    const templateName = `Template ${this.cellTemplates.length}`;
    const template = new CellTemplate(templateName, cell.settings, cell.id);
    this.cellTemplates.push(template);

    toastManager.okToast('Created cell template');
  }
}
