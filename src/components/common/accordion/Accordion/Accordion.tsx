import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';

import { styles } from './Accordion.styles';

type AccordionPropsType = AccordionProps & {
  expanded: boolean;
};

const Accordion = styled((props: AccordionPropsType) => {
  const { expanded, sx, ...otherProps } = props;
  return (
    <MuiAccordion
      {...otherProps}
      disableGutters
      expanded={expanded}
      square
      sx={{ ...styles.accordion(expanded), ...sx }}
    />
  );
})(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

export default Accordion;
