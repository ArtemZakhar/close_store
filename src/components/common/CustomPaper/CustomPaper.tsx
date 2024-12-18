import Paper, { PaperProps } from '@mui/material/Paper';

import { styles } from './CustomPaper.styles';

export const CustomPaper = (props: PaperProps) => {
  const { sx, ...otherProps } = props;
  return (
    <Paper
      {...otherProps}
      sx={(theme) => ({
        ...styles.autocompletePaper(theme.palette.primary.main),
        ...sx,
      })}
    >
      {props.children}
    </Paper>
  );
};
