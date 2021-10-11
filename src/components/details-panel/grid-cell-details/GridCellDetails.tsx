import { FormGroup, Switch } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridCell } from '../../../state/GridCell';
import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { NumberInput, NumberInputSize } from '../../common/inputs/number-input/NumberInput';
import { BorderSettingsDetails } from './BorderSettingsDetails';

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

        <BorderSettingsDetails borderSettings={gridCell.allBorderSettings} />
      </div>
    );
  }
}
