import { BreadcrumbProps, IconName } from '@blueprintjs/core';
import { action, observable } from 'mobx';

export enum DetailsPanelFocus {
  HOME = 'home',
  GRID_PLAN = 'grid-plan',
  GRID = 'grid',
  GRID_CELL = 'grid-cell',
}

export interface GPBreadcrumbProps extends BreadcrumbProps {
  focus: DetailsPanelFocus;
}

export class DetailsPanelState {
  @observable public focus = DetailsPanelFocus.HOME;
  @observable public breadcrumbs: GPBreadcrumbProps[] = [];

  private readonly homeBreadcrumb: GPBreadcrumbProps = {
    focus: DetailsPanelFocus.HOME,
    icon: 'home',
    text: 'Home',
    onClick: () => this.changeFocus(DetailsPanelFocus.HOME),
  };

  constructor() {
    this.breadcrumbs.push(this.homeBreadcrumb);
  }

  @action public setNewFocus(text: string, focus: DetailsPanelFocus) {
    // Create a new breadcrumb for the focus
    const crumb: GPBreadcrumbProps = {
      focus,
      icon: this.getFocusIcon(focus),
      text,
      onClick: () => this.changeFocus(focus),
    };

    // Add it to other breadcrumbs, focus on it now
    this.breadcrumbs.push(crumb);
    this.changeFocus(focus);
  }

  @action private changeFocus(focus: DetailsPanelFocus) {
    this.focus = focus;
  }

  private getFocusIcon(focus: DetailsPanelFocus): IconName {
    switch (focus) {
      case DetailsPanelFocus.HOME:
        return 'home';
      case DetailsPanelFocus.GRID_PLAN:
        return 'layers';
      case DetailsPanelFocus.GRID:
        return 'grid-view';
      case DetailsPanelFocus.GRID_CELL:
        return 'new-grid-item';
    }
  }
}
