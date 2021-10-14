import { Button, FormGroup, Icon, InputGroup, NumericInput, Switch } from '@blueprintjs/core';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Grid } from '../../../state/Grid';
import { NumberInput, NumberInputSize } from '../../common/inputs/number-input/NumberInput';

import './grid-details.scss';

interface Props {
  grid: Grid;
}

@observer
export class GridDetails extends React.Component<Props> {
  @observable private dimensionsApply = false;
  @observable private dimensionsApplyLoading = false;
  @observable private rows = this.props.grid.rows;
  @observable private columns = this.props.grid.columns;

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
          <NumberInput
            label={'Rows'}
            value={this.rows}
            onChange={this.setRows}
            id={'grid-rows'}
            size={NumberInputSize.MEDIUM}
          />
          <NumberInput
            label={'Columns'}
            value={this.columns}
            onChange={this.setColumns}
            size={NumberInputSize.MEDIUM}
          />
          <Button
            className={'apply-button'}
            text={'Apply'}
            disabled={!this.dimensionsApply}
            onClick={this.applyDimensions}
            loading={this.dimensionsApplyLoading}
          />
        </FormGroup>

        <FormGroup label={'Grid cell size'} labelFor={'cell-size'}>
          <NumberInput
            id={'cell-size'}
            label={'Pixels'}
            value={grid.cellSize}
            onChange={grid.setCellSize}
            size={NumberInputSize.MEDIUM}
          />
        </FormGroup>

        <FormGroup label={'Grid view'} className={'my-form-group'}>
          <Switch
            label={'Show grid lines'}
            alignIndicator={'left'}
            checked={grid.showGridLines}
            onChange={grid.toggleGridLines}
          />
          <Switch
            label={'Show grid gaps'}
            alignIndicator={'left'}
            checked={grid.showGridGap}
            onChange={grid.toggleGridGap}
          />
        </FormGroup>
      </div>
    );
  }

  @action private setRows = (rows: number) => {
    const { grid } = this.props;
    // const rows = parseInt(e.target.value);

    // Has the value changed?
    if (rows === grid.rows) {
      return;
    }

    if (rows) {
      this.rows = rows;
    }

    this.dimensionsApply = true;
  };

  @action private setColumns = (cols: number) => {
    const { grid } = this.props;

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
