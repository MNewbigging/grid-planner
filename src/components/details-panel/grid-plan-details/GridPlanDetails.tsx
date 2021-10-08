import { Button, FormGroup, InputGroup, Intent, NonIdealState } from '@blueprintjs/core';
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
        <Button
          icon={'add'}
          text={'Add grid'}
          intent={Intent.PRIMARY}
          onClick={() => gridPlan.addGrid()}
        />
        {this.renderGridPlanLayers()}
      </div>
    );
  }

  private renderGridPlanProps() {}

  private renderGridPlanLayers() {
    const { gridPlan } = this.props;

    const layers = gridPlan.grids.map((grid) => (
      <div className={'grid-layer-item'}>{grid.name}</div>
    ));

    if (!layers.length) {
      layers.push(<div className={'no-grids-item'}>No grids!</div>);
    }

    return <div className={'grid-layer-list'}>{layers}</div>;
  }
}
