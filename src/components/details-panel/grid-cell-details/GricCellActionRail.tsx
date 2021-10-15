import { Button } from '@blueprintjs/core';
import React from 'react';

import { GridCell } from '../../../state/GridCell';

import './grid-cell-action-rail.scss';

interface Props {
  gridCell: GridCell;
  createTemplate: () => void;
}

export class GridCellActionRail extends React.Component<Props> {
  public render() {
    const { createTemplate } = this.props;

    return (
      <div className={'grid-cell-action-rail'}>
        <Button icon={'insert'} minimal outlined onClick={() => createTemplate()} />
        <Button icon={'annotation'} minimal outlined />
      </div>
    );
  }
}
