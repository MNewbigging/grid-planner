import { FormGroup, NonIdealState, Text } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { CellTemplate } from '../../../state/CellTemplate';

import './cell-templates.scss';

interface Props {
  templates: CellTemplate[];
}

@observer
export class CellTemplates extends React.Component<Props> {
  public render() {
    const { templates } = this.props;

    if (!templates.length) {
      return this.renderNoTemplatesCta();
    }

    return (
      <div className={'cell-templates'}>
        {templates.map((template) => this.renderTemplateRow(template))}
      </div>
    );
  }

  private renderNoTemplatesCta() {
    return (
      <NonIdealState
        icon={'duplicate'}
        title={'No templates'}
        description={'Edit a cell and click the template button to create a new cell template'}
      />
    );
  }

  private renderTemplateRow(template: CellTemplate) {
    return (
      <div className={'template-row'}>
        <Text>{template.name}</Text>
        <div className={'template-display'} style={{ ...template.settings }}>
          <Text ellipsize>{template.text}</Text>
        </div>
      </div>
    );
  }
}
