import { Button, FormGroup, Icon, InputGroup, NumericInput } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { Grid } from '../../../state/Grid';

import './grid-details.scss';

interface Props {
  grid: Grid;
}

@observer
export class GridDetails extends React.Component<Props> {
  public render() {
    const { grid } = this.props;

    console.log('grid details render');

    return (
      <div className={'grid-details'}>
        <FormGroup label={'Grid name'} labelFor={'grid-name'}>
          <InputGroup
            id={'grid-name'}
            defaultValue={grid.name}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setName(e.target.value)}
          />
        </FormGroup>

        <FormGroup label={'Grid rows'} labelFor={'grid-rows'}>
          <NumericInput
            id={'grid-rows'}
            defaultValue={grid.rows.toString()}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setRows(e.target.value)}
            buttonPosition={'none'}
          />
        </FormGroup>

        <FormGroup label={'Grid columns'} labelFor={'grid-columns'}>
          <NumericInput
            id={'grid-columns'}
            defaultValue={grid.columns.toString()}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setColumns(e.target.value)}
            buttonPosition={'none'}
          />
        </FormGroup>
      </div>
    );
  }
}
