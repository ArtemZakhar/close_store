import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

export const styles = {
  accordionSummary: {
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
      {
        transform: 'rotate(180deg)',
      },
  },
};
