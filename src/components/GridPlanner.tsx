import React from 'react';

import { GridPlannerState } from '../state/GridPlannerState';
import { DetailsPanel } from './details-panel/DetailsPanel';
import { GridZone } from './grid-zone/GridZone';

import './grid-planner.scss';

export class GridPlanner extends React.Component {
  private readonly gridPlannerState = new GridPlannerState();

  public render() {
    return (
      <div className={'grid-planner'}>
        <div className={'details-panel-area'}>
          <DetailsPanel />
        </div>
        <div className={'grid-zone-area'}>
          <GridZone />
        </div>
      </div>
    );
  }
}