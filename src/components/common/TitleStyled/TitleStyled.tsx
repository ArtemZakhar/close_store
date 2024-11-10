import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { styles } from './TitleStyled.styles';

const TitleStyled = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Box sx={styles.titleContainer}>
      <Typography variant="h2">{label}</Typography>
      <Typography variant="body1">{children}</Typography>
    </Box>
  );
};

export default TitleStyled;
