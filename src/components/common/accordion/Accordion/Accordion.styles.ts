import { accordionClasses } from '@mui/material/Accordion';
import { accordionDetailsClasses } from '@mui/material/AccordionDetails';

export const styles = {
  accordion(expanded: boolean) {
    return {
      '&.MuiAccordion-root': {
        borderRadius: '1rem',
      },
      [`& .${accordionClasses.region}`]: {
        height: expanded ? 'auto' : 0,
      },
      [`& .${accordionDetailsClasses.root}`]: {
        display: expanded ? 'block' : 'none',
      },
    };
  },
};
