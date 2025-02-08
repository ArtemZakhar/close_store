import List, { ListProps } from '@mui/material/List';

import React from 'react';

import { styles } from './CustomList.styles';

export const CustomList = React.forwardRef<HTMLUListElement, ListProps>(
  function CustomListInternal(props, ref) {
    const { sx, ...otherProps } = props;
    return (
      <List
        {...otherProps}
        ref={ref}
        sx={() => ({
          ...styles.list(),
          ...sx,
        })}
      >
        {props.children}
      </List>
    );
  },
);
