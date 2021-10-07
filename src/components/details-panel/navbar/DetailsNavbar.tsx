import { Alignment, Breadcrumb, BreadcrumbProps, Breadcrumbs, Navbar } from '@blueprintjs/core';
import React from 'react';

import { DetailsPanelState, GPBreadcrumbProps } from '../../../state/DetailsPanelState';

interface Props {
  detailsState: DetailsPanelState;
}

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
