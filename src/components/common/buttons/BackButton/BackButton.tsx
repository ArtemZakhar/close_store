import Button from '@mui/material/Button';

import { useRouter } from 'next/navigation';

const BackButton = ({
  label,
  backPath,
  onBack,
  width,
}: {
  label?: string;
  backPath?: string;
  onBack?: () => void;
  width?: string;
}) => {
  const router = useRouter();

  const goBack = () => {
    if (backPath) {
      router.push(backPath);

      return;
    }
    if (onBack) {
      onBack();

      return;
    }

    router.back();
  };

  return (
    <Button
      sx={{
        height: 'fit-content',
        width: width ?? '13rem',
        backgroundColor: 'background.default',
      }}
      onClick={goBack}
      variant="outlined"
    >
      {label ? label : 'Назад'}
    </Button>
  );
};

export default BackButton;
