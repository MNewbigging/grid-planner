import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../state/GridPlan';
import { DetailsPanelFocus } from '../../state/GridPlannerState';
import { GridRenderer } from './renderer/GridRenderer';
import { GridZoneToolbar } from './GridZoneToolbar';
import { GridCell } from '../../state/GridCell';

import './grid-zone.scss';

interface Props {
  gridPlan: GridPlan;
  setFocus: (focus: DetailsPanelFocus) => void;
  onCellSelect: (cell: GridCell) => void;
  stopPainting?: () => void;
}

@observer
export class GridZone extends React.Component<Props> {
  public render() {
    const { gridPlan, setFocus, onCellSelect, stopPainting } = this.props;

    let content: JSX.Element = undefined;

    const noGrids = !gridPlan.grids.length;

    // No grids, show call to action
    if (noGrids) {
      content = this.renderNoGridsCta();
      // No selected grid
    } else if (gridPlan.selectedGrid === undefined) {
      content = this.renderNoSelectedGridCta();
    } else {
      // There are grids to render
      content = (
        <GridRenderer
          key={'grid-renderer'}
          grid={gridPlan.selectedGrid}
          onCellSelect={onCellSelect}
        />
      );
    }

    return (
      <div className={'grid-zone'}>
        <div className={'grid-zone-toolbar-area'}>
          {!noGrids && (
            <GridZoneToolbar
              key={'grid-toolbar'}
              gridPlan={gridPlan}
              setFocus={setFocus}
              stopPainting={stopPainting}
            />
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
    const { setFocus } = this.props;

    return (
      <NonIdealState
        icon={'grid-view'}
        title={'No selected grid'}
        description={'Select a grid from your grid plan in the side panel'}
        action={
          <Button
            icon={'layers'}
            text={'View grid plan'}
            onClick={() => setFocus(DetailsPanelFocus.GRID_PLAN)}
          />
        }
      />
    );
  }
}
