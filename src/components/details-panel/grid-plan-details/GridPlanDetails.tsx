import { FormGroup, InputGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../../state/GridPlan';

import './grid-plan-details.scss';

interface Props {
  gridPlan: GridPlan;
}

@observer
export class GridPlanDetails extends React.Component<Props> {
  public render() {
    const { gridPlan } = this.props;

    return (
      <div className={'grid-plan-details'}>
        <FormGroup label={'Grid plan name'} labelFor={'grid-plan-name'}>
          <InputGroup
            id={'grid-plan-name'}
            value={gridPlan.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => gridPlan.setName(e.target.value)}
          />
        </FormGroup>
      </div>
    );
  }
}
