import { NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';
import { GridPlanDetails } from './grid-plan-details/GridPlanDetails';
import { DetailsPanelHeading, DetailsPanelHeadingProps } from '../common/DetailsPanelHeading';
import { GridDetails } from './grid-details/GridDetails';

import './details-panel.scss';
import { GridCellDetails } from './grid-cell-details/GridCellDetails';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    let panelContent: JSX.Element = undefined;
    let headingProps: DetailsPanelHeadingProps = undefined;

    // What is the current focus for the details panel?
    switch (plannerState.detailsPanelFocus) {
      case DetailsPanelFocus.GRID_PLAN:
        if (plannerState.gridPlan) {
          panelContent = (
            <GridPlanDetails
              gridPlan={plannerState.gridPlan}
              setFocus={(focus: DetailsPanelFocus) => plannerState.setFocus(focus)}
            />
          );
          headingProps = { text: 'Grid plan', icon: 'layers' };
        }
        break;
      case DetailsPanelFocus.GRID: {
        const grid = plannerState.gridPlan.selectedGrid;
        if (grid) {
          panelContent = <GridDetails grid={grid} />;
          headingProps = { text: `Grid: ${grid.name}`, icon: 'grid-view' };
        }
        break;
      }
      case DetailsPanelFocus.GRID_CELL: {
        const grid = plannerState.gridPlan.selectedGrid;
        panelContent = <GridCellDetails />;
        headingProps = { text: `${grid.name} cell`, icon: 'new-grid-item' };
        break;
      }
    }

    // If no panel content by now, show error
    if (panelContent === undefined) {
      panelContent = this.renderPanelErrorState();
    }

    return (
      <div className={'details-panel'}>
        <div className={'panel-heading'}>
          <DetailsPanelHeading {...headingProps} />
        </div>
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
