import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlannerState } from '../../../state/GridPlannerState';

import './home-details.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class HomeDetails extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    let panelContent: JSX.Element = undefined;

    // Show a call to action if user has no grid plans
    if (!plannerState.gridPlans.length) {
      panelContent = this.renderNoGridPlanCta();
    }

    // Otherwise, list all grid plans

    return <div className={'home-details'}>{panelContent}</div>;
  }

  private renderNoGridPlanCta() {
    const { plannerState } = this.props;

    return (
      <NonIdealState
        icon={'layers'}
        title={'No Grid Plans'}
        description={'Click here to create a grid plan'}
        action={
          <Button
            text={'Add grid plan'}
            icon={'add'}
            intent={Intent.PRIMARY}
            onClick={() => plannerState.addGridPlan()}
          />
        }
      />
    );
  }
}
