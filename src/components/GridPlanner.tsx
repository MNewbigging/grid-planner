import { Button, Dialog, Icon, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlannerState } from '../state/GridPlannerState';
import { DetailsPanel } from './details-panel/DetailsPanel';
import { GridZone } from './grid-zone/GridZone';
import { VerticalNavbar } from './navbar/VerticalNavbar';

import './grid-planner.scss';

@observer
export class GridPlanner extends React.Component {
  private readonly gridPlannerState = new GridPlannerState();
  private inputRef = React.createRef<HTMLInputElement>();

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
          <GridZone
            plannerState={this.gridPlannerState}
            gridPlan={this.gridPlannerState.gridPlan}
          />
        </div>
      </div>
    );
  }

  private renderEntryDialog() {
    return (
      <div className={'grid-planner-entry'}>
        <Dialog isOpen={this.gridPlannerState.gridPlan === undefined}>
          <div className={'entry-dialog'}>
            <Icon icon={'layers'} size={50} />
            <h3>Grid Planner</h3>
            <p>Create a new grid plan, or load an existing one</p>
            <Button
              icon={'add'}
              text={'Create grid plan'}
              intent={Intent.PRIMARY}
              onClick={() => this.gridPlannerState.createGridPlan()}
            />
            <Button
              icon={'document-open'}
              text={'Load grid plan'}
              onClick={() => {
                if (this.inputRef.current) {
                  this.inputRef.current.click();
                }
              }}
              loading={this.gridPlannerState.loadingGridPlan}
            />

            <input
              ref={this.inputRef}
              type={'file'}
              id={'load-file-input'}
              className={'load-file-input'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.gridPlannerState.readGridPlanFile(e.currentTarget.files);
                e.target.value = null;
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}
