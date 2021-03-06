import { FileInput, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { StandardButton } from '../../buttons/StandardButton';

import './file-picker.scss';

interface Props {
  label: string;
  onFile: (fileList: FileList) => void;
  fileName: string;
  onRemoveFile: () => void;
  tooltipText?: string;
}

@observer
export class FilePicker extends React.Component<Props> {
  public render() {
    const { label, onFile, fileName, onRemoveFile, tooltipText } = this.props;

    return (
      <div className={'file-picker'}>
        <Text className={'label'}>{label}</Text>
        <FileInput
          className={'file-picker-input'}
          text={fileName ? fileName : 'Choose file...'}
          buttonText={'Browse'}
          inputProps={{
            accept: 'image/*',
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              onFile(e.currentTarget.files);
              e.target.value = null;
            },
          }}
        />
        <StandardButton
          className={'remove-button'}
          minimal
          outlined
          icon={'trash'}
          onClick={() => onRemoveFile()}
          tooltipText={tooltipText}
        />
      </div>
    );
  }
}
