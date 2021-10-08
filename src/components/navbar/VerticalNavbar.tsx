import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';

import './vertical-navbar.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class VerticalNavbar extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    return (
      <div className={'vertical-navbar'}>
        <Button
          icon={'layers'}
          minimal
          onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID_PLAN)}
        />

        {plannerState.gridPlan?.selectedGrid && (
          <Button
            icon={'grid-view'}
            minimal
            onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID)}
          />
        )}
      </div>
    );
  }
}
