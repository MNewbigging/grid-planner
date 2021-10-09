import { Button, FormGroup, Label, NumericInput, Switch, Text } from '@blueprintjs/core';
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
        <FormGroup label={'Background'}>
          <ColorPicker
            label={'Fill'}
            color={gridCell.settings.backgroundColor}
            setColor={gridCell.setBackgroundColor}
          />
        </FormGroup>

        <FormGroup label={'Borders'}>
          <div className={'border-control-line'}>
            <Switch
              alignIndicator={'right'}
              label={'All'}
              checked={gridCell.allBorders}
              onChange={gridCell.toggleAllBorders}
            />
            <div className={'label'}>Size</div>
            <NumericInput
              buttonPosition={'none'}
              defaultValue={gridCell.allBorderSize}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                gridCell.setAllBorderSize(e.target.value)
              }
            />
            <div className={'label'}>Radius</div>
            <NumericInput
              buttonPosition={'none'}
              defaultValue={gridCell.allBorderRadius}
              onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                gridCell.setAllBorderRadius(e.target.value)
              }
            />
            <ColorPicker
              label={'Fill'}
              color={gridCell.settings.borderColor}
              setColor={gridCell.setAllBorderColor}
            />
          </div>
        </FormGroup>
      </div>
    );
  }

  private renderBorderControlLine() {
    return (
      <div className={'border-control-line'}>
        <Switch label={'All'} />
      </div>
    );
  }
}
