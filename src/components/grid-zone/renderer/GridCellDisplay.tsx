import React, { CSSProperties } from 'react';

import { GridCell } from '../../../state/GridCell';

import './grid-cell-display.scss';

interface Props {
  gridCell: GridCell;
  onClick: () => void;
}

export class GridCellDisplay extends React.Component<Props> {
  public render() {
    const { gridCell, onClick } = this.props;

    return (
      <div
        className={'grid-cell-display'}
        style={{ ...gridCell.settings }}
        onClick={() => onClick()}
      ></div>
    );
  }
}
