import { Button, Navbar, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../state/GridPlan';

import './grid-zone-toolbar.scss';

interface Props {
  gridPlan: GridPlan;
}

@observer
export class GridZoneToolbar extends React.Component<Props> {
  public render() {
    const { gridPlan } = this.props;

    const currentGrid = gridPlan.selectedGrid;

    // Determine whether to disable last and next grid buttons
    const currentIndex = gridPlan.grids.findIndex((grid) => grid.id === currentGrid.id);
    const lastIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const disableLast = lastIndex < 0;
    const disableNext = nextIndex === gridPlan.grids.length;

    return (
      <Navbar className={'grid-zone-toolbar'}>
        <Navbar.Group>
          <Button
            icon={'chevron-left'}
            minimal
            disabled={disableLast}
            onClick={() => gridPlan.selectGridByIndex(lastIndex)}
          />
          <Text className={'selected-grid-name'}>{currentGrid.name}</Text>
          <Button
            icon={'chevron-right'}
            minimal
            disabled={disableNext}
            onClick={() => gridPlan.selectGridByIndex(nextIndex)}
          />
        </Navbar.Group>
      </Navbar>
    );
  }
}
