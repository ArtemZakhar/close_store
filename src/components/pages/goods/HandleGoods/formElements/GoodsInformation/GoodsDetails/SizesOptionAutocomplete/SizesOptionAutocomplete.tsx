import Typography from '@mui/material/Typography';

import AutocompleteStyled from '@/components/common/FormComponentsStyled/AutocompleteStyled';

import { SizesAndCountDataType, sizesData } from '../sizesData';

const SizesOptionAutocomplete = ({
  sizeType,
  handleSizesOptionChange,
}: {
  sizeType: SizesAndCountDataType;
  handleSizesOptionChange: (data: SizesAndCountDataType | null) => void;
}) => {
  return (
    <>
      <Typography marginBlock="1rem" variant="h4">
        Тип розміру
      </Typography>

      <AutocompleteStyled
        value={sizeType}
        defaultValue={sizeType}
        options={sizesData}
        onChange={(_, newData) => handleSizesOptionChange(newData)}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => {
          const { key, ...otherProps } = props;
          return (
            <li key={option.label} {...otherProps}>
              {option.name}
            </li>
          );
        }}
      />
    </>
  );
};

export default SizesOptionAutocomplete;
