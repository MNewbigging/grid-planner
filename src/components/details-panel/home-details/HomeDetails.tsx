import { Button, Intent, NonIdealState, Text } from '@blueprintjs/core';
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
    if (!plannerState.gridPlan) {
      panelContent = this.renderNoGridPlanCta();
    } else {
      // Or show details of current grid plan
      panelContent = this.renderGridPlanInfo();
    }

    return <div className={'home-details'}>{panelContent}</div>;
  }

  private renderNoGridPlanCta() {
    const { plannerState } = this.props;

    return (
      <NonIdealState
        icon={'layers'}
        title={'No Grid Plans'}
        description={'You can create or load one here'}
        action={
          <>
            <Button
              text={'Create grid plan'}
              icon={'add'}
              intent={Intent.PRIMARY}
              onClick={() => plannerState.createGridPlan()}
            />
            <Button text={'Load grid plan'} icon={'document-open'} disabled />
          </>
        }
      />
    );
  }

  private renderGridPlanInfo() {
    const { plannerState } = this.props;

    return (
      <div className={'grid-plan-info'}>
        <Text>Grid plan info:</Text>
      </div>
    );
  }
}
