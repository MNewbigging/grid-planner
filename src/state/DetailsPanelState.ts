import { BreadcrumbProps } from '@blueprintjs/core';
import { observable } from 'mobx';

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
    onClick: () => console.log('home'),
  };

  constructor() {
    this.breadcrumbs.push(this.homeBreadcrumb);
  }
}
