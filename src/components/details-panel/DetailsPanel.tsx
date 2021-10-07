import { observer } from 'mobx-react';
import React from 'react';

import './details-panel.scss';

@observer
export class DetailsPanel extends React.Component {
  public render() {
    return <div className={'details-panel'}></div>;
  }

  private renderNoGridPlanCta() {
    return <div></div>;
  }
}
