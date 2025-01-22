import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CustomList from '@/components/common/StyledAutocomplete/CustomList';
import CustomPaper from '@/components/common/StyledAutocomplete/CustomPaper';

import { SizesAndCountDataType, sizesData } from '../sizesData';
import { styles } from './SizesOptionAutocomplete.styles';

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

      <Autocomplete
        PaperComponent={CustomPaper}
        ListboxComponent={CustomList}
        popupIcon={<KeyboardArrowDownIcon sx={() => styles.arrow(false)} />}
        value={sizeType}
        defaultValue={sizeType}
        options={sizesData}
        fullWidth
        onClose={(e) => {
          e.stopPropagation();
          document.activeElement &&
            (document.activeElement as HTMLElement).blur();
        }}
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
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};

export default SizesOptionAutocomplete;
