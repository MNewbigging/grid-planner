import { Button, NonIdealState } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';
import { GridPlan } from '../../state/GridPlan';

import './grid-zone.scss';

interface Props {
  gridPlan: GridPlan;
}

@observer
export class GridZone extends React.Component<Props> {
  public render() {
    const { gridPlan } = this.props;

    let content: JSX.Element = undefined;

    // No grids, show call to action
    if (!gridPlan.grids.length) {
      content = this.renderNoGridsCta();
    }

    return <div className={'grid-zone'}>{content}</div>;
  }

  private renderNoGridsCta() {
    const { gridPlan } = this.props;

    return (
      <NonIdealState
        icon={'layers'}
        title={'No grids'}
        description={'You can create one here or in the panel to the left'}
        action={<Button icon={'add'} text={'Add grid'} onClick={() => gridPlan.addGrid()} />}
      />
    );
  }
}
