import { Button, IconName, Position } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { observer } from 'mobx-react';
import React from 'react';

interface Props {
  icon: IconName;
  onClick: () => void;
  text?: string;
  minimal?: boolean;
  outlined?: boolean;
  tooltipText?: string;
}

export const StandardButton: React.FC<Props> = observer(
  ({ icon, onClick, text, minimal, outlined, tooltipText }) => {
    return (
      <Tooltip2
        position={Position.RIGHT}
        content={tooltipText}
        disabled={tooltipText === undefined}
        renderTarget={({ isOpen: isTooltipOpen, ref: ref1, ...tooltipProps }) => (
          <Button
            icon={icon}
            text={text}
            onClick={onClick}
            minimal={minimal}
            outlined={outlined}
            {...tooltipProps}
            elementRef={ref1}
          />
        )}
      />
    );
  }
);
