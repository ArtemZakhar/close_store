import Container, { ContainerProps } from '@mui/material/Container';

const ContainerWithPadding = ({ children, sx }: ContainerProps) => {
  return (
    <Container sx={{ ...sx, px: '2.5rem' }} maxWidth="xl">
      {children}
    </Container>
  );
};

export default ContainerWithPadding;
