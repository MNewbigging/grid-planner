import { Alignment, Button, Navbar, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../state/GridPlan';
import { DetailsPanelFocus } from '../../state/GridPlannerState';

import './grid-zone-toolbar.scss';

interface Props {
  gridPlan: GridPlan;
  setFocus: (focus: DetailsPanelFocus) => void;
}

@observer
export class GridZoneToolbar extends React.Component<Props> {
  public render() {
    const { gridPlan, setFocus } = this.props;

    const currentGrid = gridPlan.selectedGrid;

    // Determine whether to disable last and next grid buttons
    const currentIndex = gridPlan.grids.findIndex((grid) => grid.id === currentGrid.id);
    const lastIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const disableLast = lastIndex < 0;
    const disableNext = nextIndex === gridPlan.grids.length;

    return (
      <Navbar className={'grid-zone-toolbar'}>
        <Navbar.Group align={Alignment.CENTER}>
          <Button
            icon={'chevron-left'}
            minimal
            disabled={disableLast}
            onClick={() => gridPlan.selectGridByIndex(lastIndex)}
          />
          <Text className={'selected-grid-name'} onClick={() => setFocus(DetailsPanelFocus.GRID)}>
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

        <Navbar.Group align={Alignment.RIGHT}>
          <Button
            icon={'grid'}
            minimal
            onClick={currentGrid.toggleGridLines}
            outlined={currentGrid.showGridLines}
          />
        </Navbar.Group>
      </Navbar>
    );
  }
}
