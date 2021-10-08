import { observer } from 'mobx-react';
import React from 'react';

import { GridPlan } from '../../state/GridPlan';

import './grid-renderer.scss';

interface Props {
  gridPlan: GridPlan;
}

@observer
export class GridRenderer extends React.Component<Props> {
  public render() {
    return <div></div>;
  }
}
