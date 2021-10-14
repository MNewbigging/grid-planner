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

    const focus = plannerState.detailsPanelFocus;

    return (
      <div className={'vertical-navbar'}>
        <div className={'section'}>
          <Button
            icon={'layers'}
            minimal
            large
            onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID_PLAN)}
            outlined={focus === DetailsPanelFocus.GRID_PLAN}
          />

          {plannerState.gridPlan?.selectedGrid && (
            <Button
              icon={'grid-view'}
              minimal
              large
              onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID)}
              outlined={focus === DetailsPanelFocus.GRID}
            />
          )}

          {plannerState.gridPlan?.selectedGrid?.selectedCell && (
            <Button
              icon={'new-grid-item'}
              minimal
              large
              onClick={() => plannerState.setFocus(DetailsPanelFocus.GRID_CELL)}
              outlined={focus === DetailsPanelFocus.GRID_CELL}
            />
          )}
        </div>

        <div className={'section'}>
          <Button icon={'duplicate'} minimal large />
        </div>
      </div>
    );
  }
}
