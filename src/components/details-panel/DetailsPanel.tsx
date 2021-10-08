import { NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';
import { GridPlanDetails } from './grid-plan-details/GridPlanDetails';
import { HomeDetails } from './home-details/HomeDetails';

import './details-panel.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    let panelContent: JSX.Element = undefined;

    // What is the current focus for the details panel?
    switch (plannerState.detailsPanelFocus) {
      case DetailsPanelFocus.HOME:
        panelContent = <HomeDetails plannerState={plannerState} />;
        break;
      case DetailsPanelFocus.GRID_PLAN:
        if (plannerState.selectedGridPlan) {
          panelContent = <GridPlanDetails gridPlan={plannerState.selectedGridPlan} />;
        }
        break;
    }

    // If no panel content by now, show error
    if (panelContent === undefined) {
      panelContent = this.renderPanelErrorState();
    }

    return (
      <div className={'details-panel'}>
        <div className={'panel-heading'}></div>
        <div className={'panel-content'}>{panelContent}</div>
      </div>
    );
  }

  private renderPanelErrorState() {
    return (
      <NonIdealState
        icon={'error'}
        title={'Uh oh!'}
        description={'Something went wrong - try reloading the page'}
      />
    );
  }
}
