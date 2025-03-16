import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';

import { styles } from './AccordionSummary.styles';

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<KeyboardArrowDownIcon color="primary" />}
    {...props}
  />
))(styles.accordionSummary);

export default AccordionSummary;
