import { Alignment, Breadcrumb, Breadcrumbs, Navbar } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import { DetailsPanelState, GPBreadcrumbProps } from '../../../state/DetailsPanelState';

interface Props {
  detailsState: DetailsPanelState;
}

@observer
export class DetailsNavbar extends React.Component<Props> {
  public render() {
    const { detailsState } = this.props;

    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Breadcrumbs
            items={detailsState.breadcrumbs}
            currentBreadcrumbRenderer={this.renderCurrentBreadcrumb}
          />
        </Navbar.Group>
      </Navbar>
    );
  }

  private renderCurrentBreadcrumb = (crumbProps: GPBreadcrumbProps) => {
    return <Breadcrumb {...crumbProps} />;
  };
}
