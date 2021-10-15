import { Button, NonIdealState, Position, Text } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
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
        <Popover2 content={this.renderTemplatePreview(template)} placement={Position.RIGHT}>
          <Button icon={'zoom-in'} minimal outlined />
        </Popover2>
      </div>
    );
  }

  private renderTemplatePreview(template: CellTemplate) {
    return (
      <div className={'preview-container'}>
        <div className={'template-preview'} style={{ ...template.settings }}>
          <Text>{template.text}</Text>
        </div>
      </div>
    );
  }
}
