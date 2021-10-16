import {
  Button,
  Classes,
  FormGroup,
  InputGroup,
  Intent,
  NonIdealState,
  Popover,
  Position,
  Text,
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

import { CellTemplate } from '../../../state/CellTemplate';
import { StandardButton } from '../../common/buttons/StandardButton';

import './cell-templates.scss';

interface Props {
  templates: CellTemplate[];
  deleteTemplate: (id: string) => void;
  paintTemplate: (id: string) => void;
}

@observer
export class CellTemplates extends React.Component<Props> {
  private templateName = '';

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
        description={
          'Edit a cell and click the template button at the top to create a new cell template'
        }
      />
    );
  }

  private renderTemplateRow(template: CellTemplate) {
    const { deleteTemplate, paintTemplate } = this.props;

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
          <StandardButton
            icon={'style'}
            minimal
            outlined
            onClick={() => paintTemplate(template.id)}
            tooltipText={'Paint template'}
          />

          <Popover2 content={this.renderTemplateNameEditor(template)}>
            <StandardButton icon={'edit'} minimal outlined tooltipText={'Edit template name'} />
          </Popover2>
          <StandardButton
            icon={'trash'}
            minimal
            outlined
            onClick={() => deleteTemplate(template.id)}
            tooltipText={'Delete template'}
          />
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

  private renderTemplateNameEditor(template: CellTemplate) {
    this.templateName = template.name;

    return (
      <div className={'template-name-editor'}>
        <FormGroup label={'Name'}>
          <InputGroup
            defaultValue={template.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (this.templateName = e.target.value)
            }
          />
        </FormGroup>

        <div className={'name-editor-actions'}>
          <Button text={'Cancel'} className={Classes.POPOVER_DISMISS} />
          <Button
            text={'Save'}
            className={Classes.POPOVER_DISMISS}
            intent={Intent.PRIMARY}
            onClick={() => template.setName(this.templateName)}
          />
        </div>
      </div>
    );
  }
}
