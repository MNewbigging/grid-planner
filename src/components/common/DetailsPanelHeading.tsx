import { Card, Icon, IconName, Text } from '@blueprintjs/core';
import React from 'react';

import './details-panel-heading.scss';

export interface DetailsPanelHeadingProps {
  text: string;
  icon: IconName;
}

export class DetailsPanelHeading extends React.Component<DetailsPanelHeadingProps> {
  public render() {
    const { text, icon } = this.props;

    return (
      <Card className={'details-panel-heading'}>
        <Icon icon={icon} color={'gray'} />
        <Text>{text}</Text>
      </Card>
    );
  }
}
