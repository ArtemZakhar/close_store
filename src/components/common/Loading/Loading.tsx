import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { styles } from './Loading.styles';

const Loading = ({
  backgroundColor = '#f5f5f5',
  height = '30vh',
}: {
  height?: string;
  backgroundColor?: string;
}) => {
  return (
    <Box sx={{ ...styles.boxStyles, backgroundColor, height }}>
      <CircularProgress />
      <Typography sx={styles.loadingText}>Завантаження...</Typography>
    </Box>
  );
};

export default Loading;
