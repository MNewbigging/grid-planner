import { Button, ButtonGroup, FormGroup, Text, TextArea } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { TextAlign, TextDecoration } from '../../../state/cell-settings/TextSettings';

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
            <div className={'text-settings-row'}>
              <Text>Text horizontal align</Text>
              <ButtonGroup minimal>
                <Button
                  icon={'alignment-left'}
                  outlined={gridCell.textSettings.isXAlignSelected(TextAlign.START)}
                  onClick={() => gridCell.textSettings.setTextAlignX(TextAlign.START)}
                />
                <Button
                  icon={'alignment-horizontal-center'}
                  outlined={gridCell.textSettings.isXAlignSelected(TextAlign.CENTER)}
                  onClick={() => gridCell.textSettings.setTextAlignX(TextAlign.CENTER)}
                />
                <Button
                  icon={'alignment-right'}
                  outlined={gridCell.textSettings.isXAlignSelected(TextAlign.END)}
                  onClick={() => gridCell.textSettings.setTextAlignX(TextAlign.END)}
                />
              </ButtonGroup>
            </div>
            <div className={'text-settings-row'}>
              <Text>Text vertical align</Text>
              <ButtonGroup minimal>
                <Button
                  icon={'alignment-top'}
                  outlined={gridCell.textSettings.isYAlignSelected(TextAlign.START)}
                  onClick={() => gridCell.textSettings.setTextAlignY(TextAlign.START)}
                />
                <Button
                  icon={'alignment-vertical-center'}
                  outlined={gridCell.textSettings.isYAlignSelected(TextAlign.CENTER)}
                  onClick={() => gridCell.textSettings.setTextAlignY(TextAlign.CENTER)}
                />
                <Button
                  icon={'alignment-bottom'}
                  outlined={gridCell.textSettings.isYAlignSelected(TextAlign.END)}
                  onClick={() => gridCell.textSettings.setTextAlignY(TextAlign.END)}
                />
              </ButtonGroup>
            </div>
            <div className={'text-settings-row'}>
              <Text>Text style</Text>
              <ButtonGroup minimal>
                <Button
                  icon={'bold'}
                  outlined={gridCell.textSettings.bold}
                  onClick={gridCell.textSettings.toggleBold}
                />
                <Button
                  icon={'italic'}
                  outlined={gridCell.textSettings.italic}
                  onClick={gridCell.textSettings.toggleItalic}
                />
                <Button
                  icon={'underline'}
                  outlined={gridCell.textSettings.isDecorationSelected(TextDecoration.UNDERLINE)}
                  onClick={() => gridCell.textSettings.setDecoration(TextDecoration.UNDERLINE)}
                />
                <Button
                  icon={'strikethrough'}
                  outlined={gridCell.textSettings.isDecorationSelected(
                    TextDecoration.STRIKETHROUGH
                  )}
                  onClick={() => gridCell.textSettings.setDecoration(TextDecoration.STRIKETHROUGH)}
                />
              </ButtonGroup>
            </div>
          </div>
        </FormGroup>
      </div>
    );
  }
}
