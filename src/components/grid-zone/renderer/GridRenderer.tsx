import { observer } from 'mobx-react';
import React from 'react';

import { Grid } from '../../../state/Grid';
import { GridCellDisplay } from './GridCellDisplay';
import { GridCell } from '../../../state/GridCell';

import './grid-renderer.scss';

interface Props {
  grid: Grid;
  onCellSelect: (cell: GridCell) => void;
}

@observer
export class GridRenderer extends React.Component<Props> {
  public render() {
    const { grid, onCellSelect } = this.props;

    const gridCells = grid.cells.map((cell) => (
      <GridCellDisplay
        key={cell.id}
        gridCell={cell}
        onClick={() => {
          grid.selectCell(cell);
          onCellSelect(cell);
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
