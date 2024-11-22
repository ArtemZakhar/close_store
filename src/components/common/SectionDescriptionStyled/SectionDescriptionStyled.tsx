import Box from '@mui/material/Box';

import React from 'react';

import { styles } from './SectionDescriptionStyled.styles';

const SectionDescriptionStyled = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Box sx={styles.headerContainer}>{children}</Box>;
};

export default SectionDescriptionStyled;
