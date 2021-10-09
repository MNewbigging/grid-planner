import { Button, FormGroup, Icon, InputGroup, NumericInput, Switch } from '@blueprintjs/core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Grid } from '../../../state/Grid';

import './grid-details.scss';

interface Props {
  grid: Grid;
}

@observer
export class GridDetails extends React.Component<Props> {
  @observable private dimensionsApply = false;
  @observable private dimensionsApplyLoading = false;
  private rows = 0;
  private columns = 0;

  public render() {
    const { grid } = this.props;

    return (
      <div className={'grid-details'}>
        <FormGroup label={'Grid name'} labelFor={'grid-name'}>
          <InputGroup
            id={'grid-name'}
            defaultValue={grid.name}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup label={'Grid dimensions'} className={'my-form-group'}>
          <div className={'input-group'}>
            Rows
            <NumericInput
              id={'grid-rows'}
              defaultValue={grid.rows}
              onBlur={this.setRows}
              buttonPosition={'none'}
            />
          </div>

          <div className={'input-group'}>
            Columns
            <NumericInput
              id={'grid-columns'}
              defaultValue={grid.columns}
              onBlur={this.setColumns}
              buttonPosition={'none'}
            />
          </div>
          <Button
            className={'apply-button'}
            text={'Apply'}
            disabled={!this.dimensionsApply}
            onClick={this.applyDimensions}
            loading={this.dimensionsApplyLoading}
          />
        </FormGroup>

        <FormGroup label={'Grid cell size'} labelFor={'cell-size'}>
          <NumericInput
            width={50}
            id={'cell-size'}
            defaultValue={grid.cellSize}
            buttonPosition={'none'}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setCellSize(e.target.value)}
          />
        </FormGroup>

        <FormGroup label={'Grid view'} className={'my-form-group'}>
          <Switch
            label={'Show grid lines'}
            alignIndicator={'left'}
            checked={grid.showGridLines}
            onChange={grid.toggleGridLines}
          />
        </FormGroup>
      </div>
    );
  }

  @action private setRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { grid } = this.props;
    const rows = parseInt(e.target.value);

    // Has the value changed?
    if (rows === grid.rows) {
      return;
    }

    if (rows) {
      this.rows = rows;
    }

    this.dimensionsApply = true;
  };

  @action private setColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { grid } = this.props;
    const cols = parseInt(e.target.value);

    // Has the value changed?
    if (cols === grid.columns) {
      return;
    }

    if (cols) {
      this.columns = cols;
    }

    this.dimensionsApply = true;
  };

  @action private applyDimensions = () => {
    this.dimensionsApply = false;
    this.dimensionsApplyLoading = true;

    setTimeout(this.createCells, 0);
  };

  private createCells = async () => {
    await this.props.grid.createCells(this.rows, this.columns);
    this.dimensionsApplyLoading = false;
  };
}
