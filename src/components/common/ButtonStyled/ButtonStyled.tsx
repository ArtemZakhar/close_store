import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { styles } from './ButtonStyled.styles';

const ButtonStyled = ({
  label,
  handleClick,
}: {
  label: string;
  handleClick: () => void;
}) => {
  return (
    <Box sx={styles.container}>
      <Button
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
        sx={styles.buttonAdd}
        onClick={handleClick}
      >
        {label}
      </Button>
    </Box>
  );
};

export default ButtonStyled;
