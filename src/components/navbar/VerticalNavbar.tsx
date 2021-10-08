import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React from 'react';

import './vertical-navbar.scss';

@observer
export class Navbar extends React.Component {
  public render() {
    return (
      <div className={'vertical-navbar'}>
        <Button icon={'home'} minimal />
      </div>
    );
  }
}
