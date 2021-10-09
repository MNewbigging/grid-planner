import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';

import { Grid } from '../../../state/Grid';
import { GridCellDisplay } from './GridCellDisplay';
import { DetailsPanelFocus } from '../../../state/GridPlannerState';

import './grid-renderer.scss';

interface Props {
  grid: Grid;
  setFocus: (focus: DetailsPanelFocus) => void;
}

@observer
export class GridRenderer extends React.Component<Props> {
  public render() {
    const { grid, setFocus } = this.props;

    const gridCells = grid.cells.map((cell) => (
      <GridCellDisplay
        key={cell.id}
        gridCell={cell}
        onClick={() => {
          grid.selectCell(cell);
          setFocus(DetailsPanelFocus.GRID_CELL);
        }}
      />
    ));

    return (
      <div className={'grid-renderer'}>
        <div className={'grid-container'} style={{ ...grid.settings }}>
          {gridCells}
        </div>
      </div>
    );
  }
}
