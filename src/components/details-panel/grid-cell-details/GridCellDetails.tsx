import { FormGroup, Switch } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridCell } from '../../../state/GridCell';
import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { NumberInput, NumberInputSize } from '../../common/inputs/number-input/NumberInput';

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

        <FormGroup label={'Borders'}>{this.renderAllBordersSettings()}</FormGroup>
      </div>
    );
  }

  private renderAllBordersSettings() {
    const { gridCell } = this.props;

    return (
      <div className={'border-control-line'}>
        <Switch
          alignIndicator={'right'}
          label={'All'}
          checked={gridCell.allBorders}
          onChange={gridCell.toggleAllBorders}
        />
        <NumberInput
          label={'Size'}
          defaultValue={gridCell.allBorderSize}
          onBlur={gridCell.setAllBorderSize}
          size={NumberInputSize.SMALL}
        />
        <NumberInput
          label={'Radius'}
          defaultValue={gridCell.allBorderRadius}
          onBlur={gridCell.setAllBorderRadius}
          size={NumberInputSize.SMALL}
        />
        <ColorPicker
          label={'Fill'}
          color={gridCell.settings.borderColor}
          setColor={gridCell.setAllBorderColor}
        />
      </div>
    );
  }
}
