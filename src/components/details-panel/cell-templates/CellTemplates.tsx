import { Button, NonIdealState, Position, Text } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

import { CellTemplate } from '../../../state/CellTemplate';

import './cell-templates.scss';

interface Props {
  templates: CellTemplate[];
  deleteTemplate: (id: string) => void;
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
    const { deleteTemplate } = this.props;

    return (
      <div key={template.id} className={'template-row'}>
        <Popover2 content={this.renderTemplatePreview(template)} placement={Position.RIGHT}>
          <div className={'template-preview-small'} style={{ ...template.settings }}>
            <Text ellipsize>{template.text}</Text>
          </div>
        </Popover2>

        <Text className={'template-name'} ellipsize>
          {template.name}
        </Text>

        <div className={'template-actions'}>
          <Button icon={'style'} minimal outlined />
          <Button icon={'edit'} minimal outlined />
          <Button icon={'trash'} minimal outlined onClick={() => deleteTemplate(template.id)} />
        </div>
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
