import { FileInput, FormGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridCell } from '../../../state/GridCell';
import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { FilePicker } from '../../common/inputs/file-picker/FilePicker';
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
          <div className={'background-settings'}>
            <ColorPicker
              label={'Fill'}
              color={gridCell.settings.backgroundColor}
              setColor={gridCell.setBackgroundColor}
            />
            <FilePicker
              label={'Image'}
              fileName={gridCell.bgImageName}
              onFile={gridCell.setBackgroundImage}
              onRemoveFile={gridCell.removeBackgroundImage}
            />
          </div>
        </FormGroup>

        <FormGroup label={'Borders'}>
          <BorderSettingsDetails
            borderSettings={gridCell.allBorderSettings}
            toggleLabel={'All borders'}
          />
          <BorderSettingsDetails
            borderSettings={gridCell.topBorderSettings}
            toggleLabel={'Top border'}
          />
          <BorderSettingsDetails
            borderSettings={gridCell.rightBorderSettings}
            toggleLabel={'Right border'}
          />
          <BorderSettingsDetails
            borderSettings={gridCell.botBorderSettings}
            toggleLabel={'Bottom border'}
          />
          <BorderSettingsDetails
            borderSettings={gridCell.leftBorderSettings}
            toggleLabel={'Left border'}
          />
        </FormGroup>
      </div>
    );
  }
}
