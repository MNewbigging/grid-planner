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
  private gridRef = React.createRef<HTMLDivElement>();
  private mousedown = false;

  componentDidMount() {
    if (this.gridRef.current) {
      this.gridRef.current.addEventListener('mousedown', this.onMouseDown);
      this.gridRef.current.addEventListener('mouseup', this.onMouseUp);
      this.gridRef.current.addEventListener('dragend', this.onMouseUp);
    }
  }

  componentWillUnmount() {
    if (this.gridRef.current) {
      this.gridRef.current.removeEventListener('mousedown', this.onMouseDown);
      this.gridRef.current.removeEventListener('mouseup', this.onMouseUp);
      this.gridRef.current.removeEventListener('dragend', this.onMouseUp);
    }
  }

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
        onMouseEnter={() => this.onMouseEnterCell(cell)}
      />
    ));

    return (
      <div className={'grid-renderer'}>
        <div ref={this.gridRef} className={'grid-container'} style={{ ...grid.settings }}>
          {gridCells}
        </div>
      </div>
    );
  }

  private onMouseDown = () => {
    this.mousedown = true;
  };

  private onMouseUp = () => {
    this.mousedown = false;
  };

  private onMouseEnterCell(cell: GridCell) {
    // Only perform a click if mouse is held down
    if (this.mousedown) {
      this.props.onCellSelect(cell);
    }
  }
}
