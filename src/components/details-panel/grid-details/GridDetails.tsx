import React from 'react';
import { Grid } from '../../../state/Grid';

import './grid-details.scss';

interface Props {
  grid: Grid;
}

export class GridDetails extends React.Component<Props> {
  public render() {
    return <div className={'grid-details'}></div>;
  }
}
