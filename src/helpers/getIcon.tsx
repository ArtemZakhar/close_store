import { Jackets } from '@/assets/icons/Jackets';
import { SweatShirts } from '@/assets/icons/SweatShirt';
import { Sweaters } from '@/assets/icons/Sweaters';
import { TShirt } from '@/assets/icons/TShirt';
import { TrackSuit } from '@/assets/icons/TrackSuit';
import { Trousers } from '@/assets/icons/Trousers';
import { Trousers2 } from '@/assets/icons/Trousers2';
import CheckroomSharpIcon from '@mui/icons-material/CheckroomSharp';
import { SxProps } from '@mui/material';

export const getIcon = (sx?: SxProps) => ({
  'Відсутня бажана іконка': (
    <CheckroomSharpIcon sx={{ ...sx, color: '#000' }} />
  ),
  Штани: <Trousers sx={sx} />,
  'Штани альтернативні': <Trousers2 sx={sx} />,
  Куртки: <Jackets sx={sx} />,
  Кофти: <Sweaters sx={sx} />,
  Світшоти: <SweatShirts sx={sx} />,
  Футболки: <TShirt sx={sx} />,
  Костюми: <TrackSuit sx={sx} />,
});
