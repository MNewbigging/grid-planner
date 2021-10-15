import { NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelFocus, GridPlannerState } from '../../state/GridPlannerState';
import { GridPlanDetails } from './grid-plan-details/GridPlanDetails';
import { DetailsPanelHeading, DetailsPanelHeadingProps } from '../common/DetailsPanelHeading';
import { GridDetails } from './grid-details/GridDetails';
import { GridCellDetails } from './grid-cell-details/GridCellDetails';
import { CellTemplates } from './cell-templates/CellTemplates';
import { GridCellActionRail } from './grid-cell-details/GricCellActionRail';

import './details-panel.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class DetailsPanel extends React.Component<Props> {
  public render() {
    const { plannerState } = this.props;

    let panelContent: JSX.Element = undefined;
    let headingProps: DetailsPanelHeadingProps = undefined;

    // What is the current focus for the details panel?
    switch (plannerState.detailsPanelFocus) {
      case DetailsPanelFocus.GRID_PLAN:
        if (plannerState.gridPlan) {
          panelContent = (
            <GridPlanDetails
              gridPlan={plannerState.gridPlan}
              setFocus={(focus: DetailsPanelFocus) => plannerState.setFocus(focus)}
            />
          );
          headingProps = { text: 'Grid plan', icon: 'layers' };
        }
        break;
      case DetailsPanelFocus.GRID: {
        const grid = plannerState.gridPlan.selectedGrid;
        if (grid) {
          panelContent = <GridDetails grid={grid} />;
          headingProps = { text: `Grid: ${grid.name}`, icon: 'grid-view' };
        }
        break;
      }
      case DetailsPanelFocus.GRID_CELL: {
        const grid = plannerState.gridPlan.selectedGrid;
        if (grid.selectedCell) {
          panelContent = <GridCellDetails gridCell={grid.selectedCell} />;
          headingProps = {
            text: `${grid.name} cell`,
            icon: 'new-grid-item',
            actionRail: (
              <GridCellActionRail
                gridCell={grid.selectedCell}
                createTemplate={() => plannerState.createTemplate(grid.selectedCell)}
                linkedTemplate={plannerState.getLinkedTemplate(grid.selectedCell)}
              />
            ),
          };
        }
        break;
      }
      case DetailsPanelFocus.TEMPLATES: {
        panelContent = (
          <CellTemplates
            templates={plannerState.cellTemplates}
            deleteTemplate={(id: string) => plannerState.deleteTemplate(id)}
            paintTemplate={(id: string) => plannerState.paintTemplate(id)}
          />
        );
        headingProps = { text: 'Cell templates', icon: 'duplicate' };
      }
    }

    // If no panel content by now, show error
    if (panelContent === undefined) {
      panelContent = this.renderPanelErrorState();
    }

    return (
      <div className={'details-panel'}>
        <div className={'panel-heading'}>
          <DetailsPanelHeading {...headingProps} />
        </div>
        <div className={'panel-content'}>{panelContent}</div>
      </div>
    );
  }

  private renderPanelErrorState() {
    return (
      <NonIdealState
        icon={'error'}
        title={'Uh oh!'}
        description={'Something went wrong - try reloading the page'}
      />
    );
  }
}
