import { Button, Intent, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlannerState } from '../../state/GridPlannerState';

import './details-panel.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    let panelContent: JSX.Element = undefined;

    // User has no grid plans made
    if (!plannerState.gridPlans.length) {
      panelContent = this.renderNoGridPlanCta();
    }

    return <div className={'details-panel'}>{panelContent}</div>;
  }

  private renderNoGridPlanCta() {
    const { plannerState } = this.props;

    return (
      <NonIdealState
        icon={'clipboard'}
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
