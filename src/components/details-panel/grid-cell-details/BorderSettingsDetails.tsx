import { FormGroup, Switch } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { BorderSettings } from '../../../state/cell-settings/BorderSettings';
import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { NumberInput, NumberInputSize } from '../../common/inputs/number-input/NumberInput';

import './border-settings-details.scss';

interface Props {
  borderSettings: BorderSettings;
}

@observer
export class BorderSettingsDetails extends React.Component<Props> {
  public render() {
    const { borderSettings } = this.props;

    return (
      <FormGroup label={'Borders'}>
        <div className={'border-control-line'}>
          <div className={'control-toggle'}>
            <Switch
              alignIndicator={'right'}
              label={'All borders'}
              checked={borderSettings.allBorders}
              onChange={borderSettings.toggleAllBorders}
            />
          </div>

          <div className={'input-row'}>
            <NumberInput
              label={'Size'}
              defaultValue={borderSettings.allBordersSize}
              onBlur={borderSettings.setAllBordersSize}
              size={NumberInputSize.SMALL}
            />
            <NumberInput
              label={'Radius'}
              defaultValue={borderSettings.allBordersRadius}
              onBlur={borderSettings.setAllBordersRadius}
              size={NumberInputSize.SMALL}
            />
            <ColorPicker
              label={'Fill'}
              color={borderSettings.allBordersColor}
              setColor={borderSettings.setAllBordersColor}
            />
          </div>
        </div>
      </FormGroup>
    );
  }
}
