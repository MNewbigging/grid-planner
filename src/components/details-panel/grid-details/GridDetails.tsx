import { Button, FormGroup, Icon, InputGroup, NumericInput } from '@blueprintjs/core';
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

        <FormGroup label={'Grid dimensions'} className={'dimensions-input'}>
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
            id={'cell-size'}
            defaultValue={grid.cellSize}
            buttonPosition={'none'}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setCellSize(e.target.value)}
          />
        </FormGroup>
      </div>
    );
  }

  @action private setRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rows = parseInt(e.target.value);
    if (rows) {
      this.rows = rows;
    }

    this.dimensionsApply = true;
  };

  @action private setColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cols = parseInt(e.target.value);
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
