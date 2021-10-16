import { observer } from 'mobx-react';
import React from 'react';
import { CellTemplate } from '../../../state/CellTemplate';
import { GridCell } from '../../../state/GridCell';
import { StandardButton } from '../../common/buttons/StandardButton';

import './grid-cell-action-rail.scss';

interface Props {
  gridCell: GridCell;
  createTemplate: () => void;
  linkedTemplate?: CellTemplate;
}

@observer
export class GridCellActionRail extends React.Component<Props> {
  public render() {
    const { gridCell, createTemplate, linkedTemplate } = this.props;

    return (
      <div className={'grid-cell-action-rail'}>
        <StandardButton
          icon={'insert'}
          minimal
          outlined
          onClick={() => createTemplate()}
          tooltipText={'Create template'}
        />

        {linkedTemplate && (
          <StandardButton
            icon={'annotation'}
            minimal
            outlined
            onClick={() => linkedTemplate.updateTemplate(gridCell)}
            tooltipText={'Update template'}
          />
        )}
      </div>
    );
  }
}
