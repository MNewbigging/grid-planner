import { Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

import { Color, ColorResult, SketchPicker } from 'react-color';
import { GridCell } from '../../../state/GridCell';

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
        {this.renderColorPicker(
          'Fill',
          gridCell.settings.backgroundColor,
          gridCell.setBackgroundColor
        )}
      </div>
    );
  }

  private renderColorPicker(label: string, color: string, setColor: (color: ColorResult) => void) {
    const { gridCell } = this.props;

    return (
      <div className={'color-picker'}>
        {label}
        <Popover2 content={<SketchPicker color={color} onChange={setColor} />}>
          <Button outlined style={{ backgroundColor: gridCell.settings.backgroundColor }} />
        </Popover2>
      </div>
    );
  }
}
