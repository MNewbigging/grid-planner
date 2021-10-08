import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { GridPlannerState } from '../../state/GridPlannerState';

import './vertical-navbar.scss';

interface Props {
  plannerState: GridPlannerState;
}

@observer
export class VerticalNavbar extends React.Component<Props> {
  public render() {
    return (
      <div className={'vertical-navbar'}>
        <Button icon={'home'} minimal />
      </div>
    );
  }
}
