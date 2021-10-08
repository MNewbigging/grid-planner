import { Button, FormGroup, Icon, InputGroup } from '@blueprintjs/core';
import React from 'react';
import { Grid } from '../../../state/Grid';

import './grid-details.scss';

interface Props {
  grid: Grid;
}

export class GridDetails extends React.Component<Props> {
  public render() {
    const { grid } = this.props;

    console.log('grid details render');

    return (
      <div className={'grid-details'}>
        <FormGroup label={'Grid name'} labelFor={'grid-name'}>
          <InputGroup
            id={'grid-name'}
            placeholder={grid.name}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => grid.setName(e.target.value)}
          />
        </FormGroup>
      </div>
    );
  }
}
