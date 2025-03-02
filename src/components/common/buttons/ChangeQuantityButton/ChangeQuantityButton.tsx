import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button';

import { styles } from './ChangeQuantityButton.styles';

const ChangeQuantityButton = ({
  type,
  callBackFunction,
  disabled,
}: {
  type: 'increase' | 'decrease';
  callBackFunction: (data: any | undefined) => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      onClick={callBackFunction}
      disabled={disabled}
      sx={(theme) => styles.button(theme.palette.primary.light)}
    >
      {type === 'increase' ? (
        <ControlPointIcon fontSize="small" />
      ) : (
        <RemoveCircleOutlineIcon fontSize="small" />
      )}
    </Button>
  );
};

export default ChangeQuantityButton;
