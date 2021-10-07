import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlannerState } from '../../state/GridPlannerState';

import './details-panel.scss';
import { GridPlanDetails } from './grid-plan-details/GridPlanDetails';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    let panelContent: JSX.Element = undefined;

    // User has a selected grid plan
    if (plannerState.selectedGridPlan) {
      panelContent = <GridPlanDetails gridPlan={plannerState.selectedGridPlan} />;
    } else if (!plannerState.gridPlans.length) {
      // User has no grid plans made
      panelContent = this.renderNoGridPlanCta();
    }

    // User has no selected grid plan

    return <div className={'details-panel'}>{panelContent}</div>;
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
