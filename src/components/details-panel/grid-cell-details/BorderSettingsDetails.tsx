import { Button, Collapse, FormGroup, MenuItem, Switch } from '@blueprintjs/core';
import { ItemRenderer, Select } from '@blueprintjs/select';
import { observer } from 'mobx-react';
import React from 'react';

import { BorderSettings, BorderType } from '../../../state/cell-settings/BorderSettings';
import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { NumberInput, NumberInputSize } from '../../common/inputs/number-input/NumberInput';

import './border-settings-details.scss';

interface Props {
  borderSettings: BorderSettings;
  toggleLabel: string;
}

const BorderTypeSelect = Select.ofType<BorderType>();

@observer
export class BorderSettingsDetails extends React.Component<Props> {
  public render() {
    const { borderSettings, toggleLabel } = this.props;

    return (
      <div className={'border-control-line'}>
        <div className={'control-toggle'}>
          <Switch
            alignIndicator={'right'}
            label={toggleLabel}
            checked={borderSettings.active}
            onChange={borderSettings.toggleActive}
          />
        </div>

        <Collapse isOpen={borderSettings.active}>
          <div className={'input-row'}>
            <NumberInput
              label={'Size'}
              value={borderSettings.size}
              onChange={borderSettings.setSize}
              size={NumberInputSize.SMALL}
            />
            <NumberInput
              label={'Radius'}
              value={borderSettings.radius}
              onChange={borderSettings.setRadius}
              size={NumberInputSize.SMALL}
            />
          </div>
          <div className={'input-row'}>
            <ColorPicker
              label={'Colour'}
              color={borderSettings.color}
              setColor={borderSettings.setColor}
            />
            <BorderTypeSelect
              items={borderSettings.getTypeOptions()}
              itemRenderer={this.borderTypeRenderer}
              onItemSelect={borderSettings.setType}
              filterable={false}
            >
              Type <Button text={borderSettings.type} rightIcon={'double-caret-vertical'} />
            </BorderTypeSelect>
          </div>
        </Collapse>
      </div>
    );
  }

  private borderTypeRenderer: ItemRenderer<BorderType> = (
    type: BorderType,
    { handleClick, modifiers }
  ) => {
    return <MenuItem key={type} active={modifiers.active} text={type} onClick={handleClick} />;
  };
}
