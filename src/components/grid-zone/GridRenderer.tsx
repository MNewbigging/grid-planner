import { observer } from 'mobx-react';
import React, { CSSProperties } from 'react';

import { Grid } from '../../state/Grid';

import './grid-renderer.scss';

interface Props {
  grid: Grid;
}

@observer
export class GridRenderer extends React.Component<Props> {
  public render() {
    const { grid } = this.props;

    const gridCells = grid.cells.map((cell) => <div key={cell.id} className={'grid-cell'}></div>);

    const gridContainerStyle: CSSProperties = {
      gridTemplateColumns: `repeat(${grid.columns}, minmax(0, ${grid.cellSize}px))`,
      gridTemplateRows: `repeat(${grid.rows}, minmax(0, ${grid.cellSize}px))`,
    };

    return (
      <div className={'grid-renderer'}>
        <div className={'grid-container'} style={gridContainerStyle}>
          {gridCells}
        </div>
      </div>
    );
  }
}
