import { Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridCell } from '../../../state/GridCell';

import './grid-cell-display.scss';

interface Props {
  gridCell: GridCell;
  onClick: () => void;
  onMouseEnter: () => void;
}

@observer
export class GridCellDisplay extends React.Component<Props> {
  public render() {
    const { gridCell, onClick, onMouseEnter } = this.props;

    return (
      <div
        className={'grid-cell-display'}
        style={{ ...gridCell.settings }}
        onClick={() => onClick()}
        onMouseEnter={onMouseEnter}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
      >
        {gridCell.selected && <div className={'selected-top-left'}></div>}

        <Text>{gridCell.textSettings.text}</Text>

        {gridCell.selected && <div className={'selected-bot-right'}></div>}
      </div>
    );
  }
}
