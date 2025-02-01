import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styles } from './ErrorMessage.styles';

const ErrorMessage = ({
  message,
  backgroundColor = 'transparent',
  height = '30vh',
}: {
  message: string;
  height?: string;
  backgroundColor?: string;
}) => {
  return (
    <Box sx={{ ...styles.boxStyles, backgroundColor, height }}>
      <Typography sx={styles.loadingText}>{message}</Typography>
    </Box>
  );
};

export default ErrorMessage;
