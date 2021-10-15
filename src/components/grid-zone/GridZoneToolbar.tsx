import { Alignment, Button, Intent, Navbar, Position, Text } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../state/GridPlan';
import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';

import './grid-zone-toolbar.scss';

interface Props {
  plannerState: GridPlannerState;
  gridPlan: GridPlan;
}

@observer
export class GridZoneToolbar extends React.Component<Props> {
  public render() {
    const { plannerState, gridPlan } = this.props;

    const currentGrid = gridPlan.selectedGrid;

    // Determine whether to disable last and next grid buttons
    const currentIndex = gridPlan.grids.findIndex((grid) => grid.id === currentGrid.id);
    const lastIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const disableLast = lastIndex < 0;
    const disableNext = nextIndex === gridPlan.grids.length;

    const isPainting = plannerState.isPainting();

    return (
      <Navbar className={'grid-zone-toolbar'}>
        <Navbar.Group align={Alignment.CENTER}>
          <Button
            icon={'chevron-left'}
            minimal
            disabled={disableLast}
            onClick={() => gridPlan.selectGridByIndex(lastIndex)}
          />
          <Text
            className={'selected-grid-name'}
            onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID)}
          >
            {currentGrid.name}
          </Text>
          <Button
            icon={'chevron-right'}
            minimal
            disabled={disableNext}
            onClick={() => gridPlan.selectGridByIndex(nextIndex)}
          />
          <Navbar.Divider />
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT} className={'view-controls'}>
          <Button
            icon={'grid'}
            minimal
            onClick={currentGrid.toggleGridLines}
            outlined={currentGrid.showGridLines}
          />
          <Button
            icon={'arrows-horizontal'}
            minimal
            onClick={currentGrid.toggleGridGap}
            outlined={currentGrid.showGridGap}
          />
          {isPainting && (
            <Button icon={'style'} minimal outlined onClick={plannerState.stopPaintingTemplate} />
          )}
        </Navbar.Group>
      </Navbar>
    );
  }
}
