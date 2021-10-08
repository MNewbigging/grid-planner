import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { GridPlan } from '../../state/GridPlan';
import { DetailsPanelFocus } from '../../state/GridPlannerState';

import './grid-zone.scss';

interface Props {
  gridPlan: GridPlan;
  setFocus: (focus: DetailsPanelFocus) => void;
}

@observer
export class GridZone extends React.Component<Props> {
  public render() {
    const { gridPlan } = this.props;

    let content: JSX.Element = undefined;

    // No grids, show call to action
    if (!gridPlan.grids.length) {
      content = this.renderNoGridsCta();
      // No selected grid
    } else if (gridPlan.selectedGrid === undefined) {
      content = this.renderNoSelectedGridCta();
    }

    return <div className={'grid-zone'}>{content}</div>;
  }

  private renderNoGridsCta() {
    const { gridPlan } = this.props;

    return (
      <NonIdealState
        icon={'layers'}
        title={'No grids'}
        description={'You can create one here or in the side panel'}
        action={
          <Button
            icon={'add'}
            text={'Add grid'}
            intent={Intent.PRIMARY}
            onClick={() => gridPlan.addGrid()}
          />
        }
      />
    );
  }

  private renderNoSelectedGridCta() {
    const { setFocus } = this.props;

    return (
      <NonIdealState
        icon={'grid-view'}
        title={'No selected grid'}
        description={'Select a grid from your grid plan in the side panel'}
        action={
          <Button
            icon={'layers'}
            text={'View grid plan'}
            onClick={() => setFocus(DetailsPanelFocus.GRID_PLAN)}
          />
        }
      />
    );
  }
}
