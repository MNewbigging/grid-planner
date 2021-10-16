import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../state/GridPlan';
import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';
import { GridRenderer } from './renderer/GridRenderer';
import { GridZoneToolbar } from './GridZoneToolbar';
import { GridCell } from '../../state/GridCell';

import './grid-zone.scss';

interface Props {
  plannerState: GridPlannerState;
  gridPlan: GridPlan;
}

@observer
export class GridZone extends React.Component<Props> {
  public render() {
    const { plannerState, gridPlan } = this.props;

    let content: JSX.Element = undefined;

    const noGrids = !gridPlan.grids.length;
    const noSelectedGrid = gridPlan.selectedGrid === undefined;

    // No grids, show call to action
    if (noGrids) {
      content = this.renderNoGridsCta();
      // No selected grid
    } else if (noSelectedGrid) {
      content = this.renderNoSelectedGridCta();
    } else {
      // There are grids to render
      content = (
        <GridRenderer
          key={'grid-renderer'}
          grid={gridPlan.selectedGrid}
          onCellSelect={(cell: GridCell) => plannerState.selectCell(cell)}
        />
      );
    }

    return (
      <div className={'grid-zone'}>
        <div className={'grid-zone-toolbar-area'}>
          {!noGrids && !noSelectedGrid && (
            <GridZoneToolbar key={'grid-toolbar'} plannerState={plannerState} gridPlan={gridPlan} />
          )}
        </div>
        <div className={'grid-zone-content'}>{content}</div>
      </div>
    );
  }

  private renderNoGridsCta() {
    const { gridPlan } = this.props;

    return (
      <NonIdealState
        icon={'layers'}
        title={'No grids'}
        description={'You can create one here or in the side panel'}
        action={
          <Button
            icon={'add'}
            text={'Add grid'}
            intent={Intent.PRIMARY}
            onClick={() => gridPlan.addGrid()}
          />
        }
      />
    );
  }

  private renderNoSelectedGridCta() {
    const { plannerState } = this.props;

    return (
      <NonIdealState
        icon={'grid-view'}
        title={'No selected grid'}
        description={'Select a grid from your grid plan in the side panel'}
        action={
          <Button
            icon={'layers'}
            text={'View grid plan'}
            onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID_PLAN)}
          />
        }
      />
    );
  }
}
