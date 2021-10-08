import React from 'react';

import { GridPlannerState } from '../state/GridPlannerState';
import { DetailsPanel } from './details-panel/DetailsPanel';
import { GridZone } from './grid-zone/GridZone';
import { VerticalNavbar } from './navbar/VerticalNavbar';

import './grid-planner.scss';
import { Button, Dialog, Icon, Intent } from '@blueprintjs/core';

export class GridPlanner extends React.Component {
  private readonly gridPlannerState = new GridPlannerState();

  public render() {
    // Show the entry dialog if there is no grid plan
    if (!this.gridPlannerState.gridPlan) {
      return this.renderEntryDialog();
    }

    return (
      <div className={'grid-planner'}>
        <div className={'navbar-area'}>
          <VerticalNavbar plannerState={this.gridPlannerState} />
        </div>
        <div className={'details-panel-area'}>
          <DetailsPanel plannerState={this.gridPlannerState} />
        </div>
        <div className={'grid-zone-area'}>
          <GridZone />
        </div>
      </div>
    );
  }

  private renderEntryDialog() {
    return (
      <div className={'grid-planner-entry'}>
        <Dialog isOpen={true}>
          <div className={'entry-dialog'}>
            <Icon icon={'layers'} size={50} />
            <h3>Grid Planner</h3>
            <p>Create a new grid, or choose a file to load</p>
            <Button icon={'add'} text={'Create grid plan'} intent={Intent.PRIMARY} />
            <Button icon={'document-open'} text={'Load grid plan'} disabled />
          </div>
        </Dialog>
      </div>
    );
  }
}
