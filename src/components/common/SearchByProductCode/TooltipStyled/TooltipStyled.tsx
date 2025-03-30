import Tooltip from '@mui/material/Tooltip';

import React from 'react';

import { styles } from './TooltipStyled.styles';

const TooltipStyled = ({ children }: { children: React.ReactElement }) => {
  return (
    <Tooltip
      arrow
      title="Не вдалось завантажити інформацію"
      slotProps={{
        tooltip: {
          sx: styles.tooltip,
        },
        arrow: {
          sx: styles.arrow,
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default TooltipStyled;
