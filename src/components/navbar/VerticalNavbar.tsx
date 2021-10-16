import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';
import { StandardButton } from '../common/buttons/StandardButton';

import './vertical-navbar.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class VerticalNavbar extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    const focus = plannerState.detailsPanelFocus;

    return (
      <div className={'vertical-navbar'}>
        <div className={'section'}>
          <StandardButton
            icon={'layers'}
            minimal
            large
            onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID_PLAN)}
            outlined={focus === DetailsPanelFocus.GRID_PLAN}
            tooltipText={'Grid plan details'}
          />

          {plannerState.gridPlan?.selectedGrid && (
            <StandardButton
              icon={'grid-view'}
              minimal
              large
              onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID)}
              outlined={focus === DetailsPanelFocus.GRID}
              tooltipText={'Selected grid details'}
            />
          )}

          {plannerState.gridPlan?.selectedGrid?.selectedCell && (
            <StandardButton
              icon={'new-grid-item'}
              minimal
              large
              onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID_CELL)}
              outlined={focus === DetailsPanelFocus.GRID_CELL}
              tooltipText={'Selected cell details'}
            />
          )}
        </div>

        <div className={'section'}>
          <StandardButton
            icon={'duplicate'}
            minimal
            large
            onClick={() => plannerState.setFocus(DetailsPanelFocus.TEMPLATES)}
            outlined={focus === DetailsPanelFocus.TEMPLATES}
            tooltipText={'Cell templates'}
          />
        </div>
      </div>
    );
  }
}
