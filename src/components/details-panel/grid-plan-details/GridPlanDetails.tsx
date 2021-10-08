import { Button, Intent } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { Grid } from '../../../state/Grid';

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

  private renderGridPlanLayers() {
    const { gridPlan } = this.props;

    const layers = gridPlan.grids.map((grid) => this.renderGridItem(grid));

    if (!layers.length) {
      layers.push(
        <div key={'no-grid-item'} className={'no-grids-item'}>
          No grids!
        </div>
      );
    }

    return <div className={'grid-layer-list'}>{layers}</div>;
  }

  private renderGridItem(grid: Grid) {
    return (
      <div key={grid.id} className={'grid-layer-item'}>
        <div className={'grid-name'}>{grid.name}</div>
        <div className={'grid-actions'}>
          <Button icon={'edit'} />
          <Button icon={'trash'} />
        </div>
      </div>
    );
  }
}
