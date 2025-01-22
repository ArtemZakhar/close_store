import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import { ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { FormType } from '../../../NewGoods';

const AutocompleteTags = ({
  value,
  field,
}: {
  value: string[];
  field: ControllerRenderProps<FormType, 'subCategory'>;
}): ReactNode => {
  const maxVisibleTags = 3;
  const displayedTags = value.slice(0, maxVisibleTags);
  const moreTagsCount = value.length - maxVisibleTags;

  return (
    <>
      {displayedTags.map((option) => (
        <Chip
          key={option}
          label={option}
          onDelete={() => field.onChange(value.filter((tag) => tag !== option))}
        />
      ))}
      {moreTagsCount > 0 && (
        <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
          +{moreTagsCount}...
        </Typography>
      )}
    </>
  );
};

export default AutocompleteTags;
