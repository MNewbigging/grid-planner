import { Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

import { Color, ColorResult, SketchPicker } from 'react-color';
import { GridCell } from '../../../state/GridCell';
import { ColorPicker } from '../../common/color-picker/ColorPicker';

import './grid-cell-details.scss';

interface Props {
  gridCell: GridCell;
}

@observer
export class GridCellDetails extends React.Component<Props> {
  public render() {
    const { gridCell } = this.props;

    return (
      <div className={'grid-cell-details'}>
        <ColorPicker
          label={'Fill'}
          color={gridCell.settings.backgroundColor}
          setColor={gridCell.setBackgroundColor}
        />
      </div>
    );
  }
}
