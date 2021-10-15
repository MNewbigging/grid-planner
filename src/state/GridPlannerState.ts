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

enum CurrentAction {
  NONE = 'none',
  APPLY_TEMPLATE = 'apply-template',
  ERASING = 'erasing',
}

export class GridPlannerState {
  @observable public detailsPanelFocus = DetailsPanelFocus.GRID_PLAN;
  @observable.ref public gridPlan?: GridPlan;
  @observable public cellTemplates: CellTemplate[] = [];
  @observable.ref public paintingTemplate?: CellTemplate;
  @observable public eraserActive = false;
  private currentAction = CurrentAction.NONE;

  @action public setFocus(focus: DetailsPanelFocus) {
    this.detailsPanelFocus = focus;
  }

  @action public selectCell(cell: GridCell) {
    switch (this.currentAction) {
      case CurrentAction.NONE:
        this.setFocus(DetailsPanelFocus.GRID_CELL);
        break;
      case CurrentAction.APPLY_TEMPLATE:
        if (this.paintingTemplate) {
          cell.applyTemplate(this.paintingTemplate);
        }
        break;
      case CurrentAction.ERASING:
        cell.reset();
        break;
    }

    // Are we painting a template just now?
    if (!this.paintingTemplate) {
      this.setFocus(DetailsPanelFocus.GRID_CELL);
    } else {
      // Apply the template to this cell
      cell.applyTemplate(this.paintingTemplate);
      // Link this cell to the template
      // TODO
    }
  }

  @action public createGridPlan() {
    // Create a new grid plan
    const gridPlan = new GridPlan(RandomUtils.createId());

    // Select it, focus on it
    this.gridPlan = gridPlan;
    this.detailsPanelFocus = DetailsPanelFocus.GRID_PLAN;
  }

  @action public createTemplate(cell: GridCell) {
    const templateName = `Template ${this.cellTemplates.length + 1}`;
    const template = new CellTemplate(templateName, cell);
    this.cellTemplates.push(template);

    toastManager.successToast('Created cell template');
  }

  public getLinkedTemplate(cell: GridCell): CellTemplate | undefined {
    for (const template of this.cellTemplates) {
      if (template.hasLinkedCell(cell.id)) {
        return template;
      }
    }

    return undefined;
  }

  @action public deleteTemplate(id: string) {
    this.cellTemplates = this.cellTemplates.filter((tmp) => tmp.id !== id);
  }

  @action public paintTemplate(id: string) {
    this.paintingTemplate = this.cellTemplates.find((tmp) => tmp.id === id);
    this.currentAction = CurrentAction.APPLY_TEMPLATE;

    toastManager.toast(
      'Click and drag to paint the template over grid cells. To cancel, click the paint button in the toolbar.'
    );
  }

  public isPainting() {
    return this.paintingTemplate !== undefined;
  }

  @action public stopPaintingTemplate = () => {
    this.paintingTemplate = undefined;
    this.currentAction = CurrentAction.NONE;

    toastManager.toast('Exited template painting mode');
  };

  @action public toggleEraser = () => {
    this.eraserActive = !this.eraserActive;

    this.currentAction = this.eraserActive ? CurrentAction.ERASING : CurrentAction.NONE;
  };
}
