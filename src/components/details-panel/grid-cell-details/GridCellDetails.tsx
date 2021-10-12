import { Button, ButtonGroup, FormGroup, Text, TextArea } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { TextAlign } from '../../../state/cell-settings/TextSettings';

import { GridCell } from '../../../state/GridCell';
import { ColorPicker } from '../../common/inputs/color-picker/ColorPicker';
import { FilePicker } from '../../common/inputs/file-picker/FilePicker';
import { TextAreaInput } from '../../common/inputs/textarea-input/TextAreaInput';
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

        <FormGroup label={'Content'}>
          <div className={'text-settings'}>
            <TextAreaInput
              label={'Text'}
              text={gridCell.textSettings.text}
              onChange={gridCell.textSettings.setText}
            />
            <div className={'text-layout-settings'}>
              <Text>Text align</Text>
              <ButtonGroup minimal>
                <Button
                  icon={'align-left'}
                  outlined={gridCell.textSettings.isAlignSelected(TextAlign.LEFT)}
                  onClick={() => gridCell.textSettings.setTextAlign(TextAlign.LEFT)}
                />
                <Button
                  icon={'align-center'}
                  outlined={gridCell.textSettings.isAlignSelected(TextAlign.CENTER)}
                  onClick={() => gridCell.textSettings.setTextAlign(TextAlign.CENTER)}
                />
                <Button
                  icon={'align-right'}
                  outlined={gridCell.textSettings.isAlignSelected(TextAlign.RIGHT)}
                  onClick={() => gridCell.textSettings.setTextAlign(TextAlign.RIGHT)}
                />
                <Button
                  icon={'align-justify'}
                  outlined={gridCell.textSettings.isAlignSelected(TextAlign.JUSTIFY)}
                  onClick={() => gridCell.textSettings.setTextAlign(TextAlign.JUSTIFY)}
                />
              </ButtonGroup>
            </div>
          </div>
        </FormGroup>
      </div>
    );
  }
}
