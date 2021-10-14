import { Card, Icon, IconName, Text } from '@blueprintjs/core';
import React from 'react';

import './details-panel-heading.scss';

export interface DetailsPanelHeadingProps {
  text: string;
  icon: IconName;
  actionRail?: JSX.Element;
}

export class DetailsPanelHeading extends React.Component<DetailsPanelHeadingProps> {
  public render() {
    const { text, icon, actionRail } = this.props;

    return (
      <Card className={'details-panel-heading'}>
        <div className={'title-section'}>
          <Icon icon={icon} color={'gray'} />
          <Text>{text}</Text>
        </div>

        {actionRail}
      </Card>
    );
  }
}
